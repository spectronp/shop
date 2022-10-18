<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;

class Client extends Model
{
    use HasFactory;
    use SoftDeletes;
    use Searchable;

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
