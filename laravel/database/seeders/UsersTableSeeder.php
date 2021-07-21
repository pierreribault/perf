<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (User::where('email', 'test@test.fr')->doesntExist()) {
            User::create([
                'name' => 'test',
                'email' => 'test@test.fr',
                'email_verified_at' => now(),
                'password' => bcrypt('password'),
            ]);
        }

        if (User::where('email', 'admin@test.fr')->doesntExist()) {
            User::create([
                'name' => 'admin',
                'email' => 'admin@test.fr',
                'email_verified_at' => now(),
                'role' => 'admin',
                'password' => bcrypt('password'),
            ]);
        }
    }
}
