<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Calendar Secondary - {{ config('app.name', 'Laravel') }}</title>
  @vite(['resources/css/app.css', 'resources/js/custom.js', 'resources/js/calendar-secondary.js'])
</head>

<body class="min-h-screen bg-base-100">
  <!-- Navbar -->
  <div class="navbar bg-base-200 sticky top-0 z-50">
    <div class="navbar-start">
      <a class="btn btn-ghost text-xl">Calendar App</a>
    </div>
    <div class="navbar-end">
      <label class="swap swap-rotate btn btn-ghost btn-circle" id="theme-toggle">
        <input type="checkbox" id="theme-checkbox" />
        <!-- Sun icon (light mode) -->
        <svg class="swap-off h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>
        <!-- Moon icon (dark mode) -->
        <svg class="swap-on h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>
    </div>
  </div>

  <div class="container mx-auto px-4 py-6 max-w-7xl">
    <!-- Header with Title and Search -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="calendar-secondary-header-title text-2xl font-bold">November, 2025</h1>
      <div class="flex items-center gap-4">
        <!-- Search -->
        <div class="form-control">
          <div class="input-group">
            <input type="text" placeholder="Search" class="input input-bordered w-64" />
            <button class="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Control Bar -->
    <div class="flex justify-between items-center mb-6" id="calendar-secondary-control-bar">
      <div class="flex items-center gap-4">
        <!-- Navigation -->
        <div class="flex items-center join">
          <button id="prev-btn" class="btn btn-sm join-item">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button id="today-btn" class="btn btn-sm join-item">Today</button>
          <button id="next-btn" class="btn btn-sm join-item">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Appointment Types Dropdown -->
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-sm btn-ghost">
            Appointment Types
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li><a>All Types</a></li>
            <li><a>Type 1</a></li>
            <li><a>Type 2</a></li>
          </ul>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <!-- View Toggle Buttons -->
        <div class="btn-group">
          <button id="day-view-btn" class="btn btn-sm">Day</button>
          <button id="week-view-btn" class="btn btn-sm">Week</button>
          <button id="month-view-btn" class="btn btn-sm btn-active">Month</button>
        </div>

        <!-- Add Appointment Button with Dropdown -->
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-sm btn-error">
            + Add appointment
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li><a>Add Calendar</a></li>
            <li><a>Value 2</a></li>
            <li><a>Value 3</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Calendar -->
    <section>
      <div id="calendar-secondary" class="w-full calendar-container"></div>
    </section>
  </div>

  <!-- Event Modal -->
  <dialog id="event-modal-secondary" class="modal">
    <div class="modal-box w-11/12 max-w-2xl">
      <div class="flex justify-between items-center mb-4">
        <h3 id="modal-title-secondary" class="font-bold text-lg">Create appointment</h3>
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost">✕</button>
        </form>
      </div>
      <form id="event-form-secondary">
        <input type="hidden" id="event-id-secondary" name="event-id" />

        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">Title *</span>
          </label>
          <input type="text" id="event-title-secondary" name="event-title" placeholder="Enter title" class="input input-bordered w-full" required />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Start *</span>
            </label>
            <input type="datetime-local" id="event-start-secondary" name="event-start" class="input input-bordered w-full" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">End</span>
            </label>
            <input type="datetime-local" id="event-end-secondary" name="event-end" class="input input-bordered w-full" />
          </div>
        </div>

        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">Color</span>
          </label>
          <input type="color" id="event-color-secondary" name="event-color" value="#3b82f6" class="input input-bordered w-full h-12" />
        </div>

        <div class="modal-action">
          <button type="button" id="delete-event-btn-secondary" class="btn btn-error" style="display: none;">Delete</button>
          <button type="button" id="close-modal-btn-secondary" class="btn btn-ghost">Cancel</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>

</body>

</html>