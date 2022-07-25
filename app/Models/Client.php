<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'about'];

    public function isEqual( mixed $client ): bool
    {
        if( ! $client instanceof Client ) return false;

        foreach($this->fillable as $field)
        {
            if($this->$field !== $client->$field) return false;
        }

        return true;
    }
}
