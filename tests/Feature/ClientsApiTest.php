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
}
