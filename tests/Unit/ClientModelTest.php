<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Client;

class ClientModelTest extends TestCase
{
    public function test_returns_true_when_equal(): void
    {
        $client_data = [
            'name' => 'Joaquin',
            'about' => 'farm guy'
        ];

        $client1 = new Client($client_data);
        $client2 = new Client($client_data);

        $this->assertTrue($client1->isEqual($client2));
    }

    public function test_returns_false_when_not_equal(): void
    {
        $client_data1 = [
            'name' => 'Joaquin',
            'about' => 'farm guy'
        ];
        $client_data2 = [
            'name' => 'Joaquin',
            'about' => 'not a farm guy'
        ];

        $client1 = new Client($client_data1);
        $client2 = new Client($client_data2);

        $this->assertFalse($client1->isEqual($client2));
        $this->assertFalse($client2->isEqual($client1));
    }

    public function test_returns_false_if_not_client(): void
    {
        $client = new Client();

        $this->assertFalse($client->isEqual('not a client'));
    }
}
