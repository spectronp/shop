<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;
use App\Models\Client;

class ClientsApiTest extends TestCase
{
    use RefreshDatabase;

    public function testCanAddClient(): void
    {
        $client = [
            "name" => "John Doe",
            "about" => "really cool guy"
        ];

        $response = $this->postJson('/api/clients', [
            "client" => $client
        ]);

        $response->assertStatus(201)->assertJson( fn (AssertableJson $json) =>
            $json->whereType('id', 'integer')
        );
        $this->assertDatabaseHas('clients', $client );
    }

    public function testNoClientKey(): void
    {
        $response = $this->postJson('/api/clients');

        $response->assertStatus(400)->assertJson([
            "error" => "The request body should have a json object with a client field"
        ]);
    }

    public function testNoNameKey(): void
    {
        $response = $this->postJson('/api/clients', [ "client" => [] ]);

        $response->assertStatus(400)->assertJson([
            "error" => "The client object should have at least a name field"
        ]);
    }

    public function testClientCanNotBeDuplicate(): void
    {
        $client = [
            'name' => 'John Duo',
            'about' => 'has a twin'
        ];

        Client::create($client);

        $response = $this->postJson('/api/clients', ['client' => $client]);

        $response->assertStatus(409)->assertJson([
            "error" => "Other client with the same description already exists" // NOTE -- change this message ???
        ]);
    }

    public function test_can_get_history(): void
    {
        $history = 'history string';

        $client = Client::create([
            'name' => 'John' // Can't insert history here because it is not in $fillable
        ]);
        $client->history = $history;
        $client->save();

        $response = $this->getJson("/api/clients/{$client->id}/history");

        $response->assertStatus(200)->assertJson([
            'history' => $history
        ]);
    }

    public function test_return_empty_string_if_history_is_null(): void
    {
        $client = Client::create([ 'name' => 'John' ]);

        $response = $this->getJson("/api/clients/{$client->id}/history");

        $response->assertStatus(200)->assertJson( fn (AssertableJson $json) =>
            $json->where('history', '')
        );
    }

    public function test_can_update_history(): void
    {
        $initial_history = 'first hisotry';
        $updated_history = 'second history';
        $client = Client::create([
            'name' => 'John',
            'history' => $initial_history
        ]);

        $response = $this->putJson("/api/clients/{$client->id}/history", [ 'history' => $updated_history ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('clients', [
            'name' => 'John',
            'history' => $updated_history
        ]);
    }

    public function test_can_update_client(): void
    {
        $client = Client::create([
            'name' => 'John',
            'about' => 'father'
        ]);
        $updated_client = [
            'name' => 'Not John',
            'about' => 'mother'
        ];

        $response = $this->putJson("/api/clients/{$client->id}", $updated_client);

        $response->assertStatus(200);

        $this->assertDatabaseMissing('clients', $client->getAttributes());
        $this->assertDatabaseHas('clients', $updated_client);
    }
}
