<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class ClientsApiTest extends TestCase
{
    use RefreshDatabase;

    public function testCanAddClient(): void
    {
        $response = $this->postJson('/clients', [
            "client" => [
                "name" => "John Doe",
                "about" => "really cool guy"
            ]
        ]);

        $response->assertStatus(201)->assertJson( fn (AssertableJson $json) =>
            $json->whereType('id', 'integer')
        );
    }

    public function testNoClientKey(): void
    {
        $response = $this->postJson('/clients');

        $response->assertStatus(400)->assertJson([
            "error" => "The request body should have a json object with a client field"
        ]);
    }

    public function testNoNameKey(): void
    {
        $response = $this->postJson('/clients', [ "client" => [] ]);

        $response->assertStatus(400)->assertJson([
            "error" => "The client object should have at least a name field"
        ]);
    }
}
