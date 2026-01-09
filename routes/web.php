<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PostController::class, 'index']);

Route::get('/calendar-1', function () {
  return view('calendar-1');
});

Route::get('/calendar-secondary', function () {
  return view('calendar-secondary');
});

Route::resource('posts', PostController::class)->except('index');
