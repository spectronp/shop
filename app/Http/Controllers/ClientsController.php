<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;

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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
