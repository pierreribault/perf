<?php

namespace Database\Seeders;

use App\Models\Fake;
use Illuminate\Database\Seeder;

class FakesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Fake::factory()->count(20000)->create();
    }
}
