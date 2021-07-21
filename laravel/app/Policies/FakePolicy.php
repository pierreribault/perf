<?php

namespace App\Policies;

use App\Models\Fake;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class FakePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Fake  $fake
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Fake $fake)
    {
        return $user->isAdmin();
    }
}
