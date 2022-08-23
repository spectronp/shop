<?php

namespace App\Http\Controllers;

use Illuminate\Http\Resquest;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if($request->missing('client'))
        {
            return response([
                'error' => 'The request body should have a json object with a client field'
            ], 400);
        }

        if($request->missing('client.name'))
        {
            return response([
                'error' => 'The client object should have at least a name field'
            ], 400);
        }

        $client = new Client([
            'name' => $request->input('client.name'),
            'about' => $request->input('client.about')
        ]);

        if( $client->isEqual(Client::firstWhere('name', $client->name)) )
        {
            return response([
                'error' => 'Other client with the same description already exists'
            ], 409);
        }

        $client->save();

        return response([
            'id' => $client->id
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function show(Client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Client $client)
    {
        $client->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(Client $client)
    {
        $client->delete();
    }

    /**
     * Display the hisotry of the specified client
     *
     * @param Client $client
     * @return \Illuminate\Http\Response
     */
    public function getHistory(Client $client)
    {
        $history = $client->history ?? '';

        return response([
            'history' => $history
        ]);
    }

    /**
     * Update history of the specified client
     *
     * @param Client $client
     * @return \Illuminate\Http\Response
     */
    public function updateHistory(Request $request , Client $client)
    {
        $client->history = $request->input('history');
        $client->save();
    }
}
