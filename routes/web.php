<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PostController::class, 'index']);

Route::get('/calendar-1', function () {
  return view('calendar-1');
});

Route::resource('posts', PostController::class)->except('index');
