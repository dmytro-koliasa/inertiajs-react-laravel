<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Calendar - {{ config('app.name', 'Laravel') }}</title>
  @vite(['resources/css/app.css', 'resources/js/custom.js', 'resources/js/calendar.js'])
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

  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <!-- Calendar -->
    <section>
      <div id="calendar" class="w-full calendar-container"></div>
    </section>
  </div>

  <!-- Schedule Drawer (Right Side) -->
  <div class="drawer drawer-end z-50">
    <input id="schedule-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side">
      <label for="schedule-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="bg-base-100 min-h-full w-[500px] max-w-full p-6 overflow-y-auto">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold text-xl">Create availability schedule</h3>
          <label for="schedule-drawer" class="btn btn-sm btn-circle btn-ghost">✕</label>
        </div>

        <form id="schedule-form">
          <!-- Schedule Name -->
          <div class="form-control mb-6">
            <label class="label">
              <span class="label-text font-medium">Schedule Name</span>
            </label>
            <input type="text" id="schedule-name" name="schedule-name" placeholder="Working hours" class="input input-bordered w-full" value="Working hours" />
          </div>

          <!-- Visit Type -->
          <div class="form-control mb-6">
            <label class="label">
              <span class="label-text font-medium">Visit Type</span>
            </label>
            <div class="grid grid-cols-3 gap-2">
              <label class="cursor-pointer">
                <input type="radio" name="visit-type" value="on-site" class="peer hidden" checked />
                <div class="border-2 border-base-300 rounded-lg p-3 flex items-center gap-2 peer-checked:border-primary peer-checked:bg-primary/5 text-sm">
                  <div class="radio radio-primary radio-sm"></div>
                  <span>On-site</span>
                </div>
              </label>
              <label class="cursor-pointer">
                <input type="radio" name="visit-type" value="video" class="peer hidden" />
                <div class="border-2 border-base-300 rounded-lg p-3 flex items-center gap-2 peer-checked:border-primary peer-checked:bg-primary/5 text-sm">
                  <div class="radio radio-primary radio-sm"></div>
                  <span>Video</span>
                </div>
              </label>
              <label class="cursor-pointer">
                <input type="radio" name="visit-type" value="both" class="peer hidden" />
                <div class="border-2 border-base-300 rounded-lg p-3 flex items-center gap-2 peer-checked:border-primary peer-checked:bg-primary/5 text-sm">
                  <div class="radio radio-primary radio-sm"></div>
                  <span>Both</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Duration & Time zone -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Duration</span>
              </label>
              <select id="schedule-duration" class="select select-bordered w-full select-sm">
                <option value="30">30 minutes</option>
                <option value="60" selected>1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Time zone</span>
              </label>
              <select id="schedule-timezone" class="select select-bordered w-full select-sm">
                <option value="Europe/Kiev">(GMT+02:00) EET</option>
                <option value="Europe/London">(GMT+00:00) London</option>
                <option value="America/New_York">(GMT-05:00) New York</option>
                <option value="America/Los_Angeles">(GMT-08:00) Los Angeles</option>
              </select>
            </div>
          </div>

          <!-- Weekly Schedule -->
          <div class="space-y-3 mb-6">
            <!-- Monday -->
            <div class="flex items-center gap-3">
              <label class="cursor-pointer flex items-center gap-2 w-28">
                <input type="checkbox" class="toggle toggle-primary toggle-sm" checked />
                <span class="label-text text-sm">Mondays</span>
              </label>
              <div class="flex items-center gap-1 flex-1">
                <select class="select select-bordered select-xs w-24">
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                </select>
                <select class="select select-bordered select-xs w-24">
                  <option>1:00 PM</option>
                  <option>2:00 PM</option>
                  <option>5:00 PM</option>
                  <option>6:00 PM</option>
                </select>
                <button type="button" class="btn btn-ghost btn-xs btn-square text-warning">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12z" />
                  </svg>
                </button>
                <button type="button" class="btn btn-ghost btn-xs btn-square">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Tuesday -->
            <div class="flex items-center gap-3">
              <label class="cursor-pointer flex items-center gap-2 w-28">
                <input type="checkbox" class="toggle toggle-primary toggle-sm" checked />
                <span class="label-text text-sm">Tuesdays</span>
              </label>
              <div class="flex items-center gap-1 flex-1">
                <select class="select select-bordered select-xs w-24">
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                </select>
                <select class="select select-bordered select-xs w-24">
                  <option>1:00 PM</option>
                  <option>2:00 PM</option>
                  <option>5:00 PM</option>
                  <option>6:00 PM</option>
                </select>
                <button type="button" class="btn btn-ghost btn-xs btn-square text-warning">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12z" />
                  </svg>
                </button>
                <button type="button" class="btn btn-ghost btn-xs btn-square">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Wednesday -->
            <div class="flex items-center gap-3">
              <label class="cursor-pointer flex items-center gap-2 w-28">
                <input type="checkbox" class="toggle toggle-primary toggle-sm" checked />
                <span class="label-text text-sm">Wednesdays</span>
              </label>
              <div class="flex items-center gap-1 flex-1">
                <select class="select select-bordered select-xs w-24">
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                </select>
                <select class="select select-bordered select-xs w-24">
                  <option>1:00 PM</option>
                  <option>2:00 PM</option>
                  <option>5:00 PM</option>
                  <option>6:00 PM</option>
                </select>
                <button type="button" class="btn btn-ghost btn-xs btn-square text-warning">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12z" />
                  </svg>
                </button>
                <button type="button" class="btn btn-ghost btn-xs btn-square">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Thursday -->
            <div class="flex items-center gap-3">
              <label class="cursor-pointer flex items-center gap-2 w-28">
                <input type="checkbox" class="toggle toggle-primary toggle-sm" checked />
                <span class="label-text text-sm">Thursdays</span>
              </label>
              <div class="flex items-center gap-1 flex-1">
                <select class="select select-bordered select-xs w-24">
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                </select>
                <select class="select select-bordered select-xs w-24">
                  <option>1:00 PM</option>
                  <option>2:00 PM</option>
                  <option>5:00 PM</option>
                  <option>6:00 PM</option>
                </select>
                <button type="button" class="btn btn-ghost btn-xs btn-square text-warning">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12z" />
                  </svg>
                </button>
                <button type="button" class="btn btn-ghost btn-xs btn-square">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Friday -->
            <div class="flex items-center gap-3">
              <label class="cursor-pointer flex items-center gap-2 w-28">
                <input type="checkbox" class="toggle toggle-primary toggle-sm" checked />
                <span class="label-text text-sm">Fridays</span>
              </label>
              <div class="flex items-center gap-1 flex-1">
                <select class="select select-bordered select-xs w-24">
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                </select>
                <select class="select select-bordered select-xs w-24">
                  <option>1:00 PM</option>
                  <option>2:00 PM</option>
                  <option>5:00 PM</option>
                  <option>6:00 PM</option>
                </select>
                <button type="button" class="btn btn-ghost btn-xs btn-square text-warning">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12z" />
                  </svg>
                </button>
                <button type="button" class="btn btn-ghost btn-xs btn-square">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Saturday -->
            <div class="flex items-center gap-3">
              <label class="cursor-pointer flex items-center gap-2 w-28">
                <input type="checkbox" class="toggle toggle-primary toggle-sm" />
                <span class="label-text text-sm text-base-content/50">Saturdays</span>
              </label>
              <div class="flex items-center gap-1 flex-1 opacity-50">
                <select class="select select-bordered select-xs w-24" disabled>
                  <option>9:00 AM</option>
                </select>
                <select class="select select-bordered select-xs w-24" disabled>
                  <option>1:00 PM</option>
                </select>
              </div>
            </div>

            <!-- Sunday -->
            <div class="flex items-center gap-3">
              <label class="cursor-pointer flex items-center gap-2 w-28">
                <input type="checkbox" class="toggle toggle-primary toggle-sm" />
                <span class="label-text text-sm text-base-content/50">Sundays</span>
              </label>
              <div class="flex items-center gap-1 flex-1 opacity-50">
                <select class="select select-bordered select-xs w-24" disabled>
                  <option>9:00 AM</option>
                </select>
                <select class="select select-bordered select-xs w-24" disabled>
                  <option>1:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-2 pt-4 border-t border-base-300">
            <label for="schedule-drawer" class="btn btn-ghost">Cancel</label>
            <button type="submit" class="btn btn-primary">Save Schedule</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Event Modal -->
  <dialog id="event-modal" class="modal">
    <div class="modal-box w-11/12 max-w-2xl">
      <div class="flex justify-between items-center mb-4">
        <h3 id="modal-title" class="font-bold text-lg">Создать событие</h3>
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost">✕</button>
        </form>
      </div>
      <form id="event-form">
        <input type="hidden" id="event-id" name="event-id" />

        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">Название события *</span>
          </label>
          <input type="text" id="event-title" name="event-title" placeholder="Введите название" class="input input-bordered w-full" required />
        </div>

        <div class="form-control mb-4">
          <label class="label cursor-pointer justify-start gap-2">
            <input type="checkbox" id="event-allday" name="event-allday" class="checkbox checkbox-primary" />
            <span class="label-text">Весь день</span>
          </label>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Начало *</span>
            </label>
            <input type="datetime-local" id="event-start" name="event-start" class="input input-bordered w-full" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Конец</span>
            </label>
            <input type="datetime-local" id="event-end" name="event-end" class="input input-bordered w-full" />
          </div>
        </div>

        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">Цвет</span>
          </label>
          <input type="color" id="event-color" name="event-color" value="#3b82f6" class="input input-bordered w-full h-12" />
        </div>

        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">Заметки / Описание</span>
          </label>
          <textarea id="event-description" name="event-description" placeholder="Добавьте заметки или описание события..." class="textarea textarea-bordered w-full h-24"></textarea>
        </div>

        <div class="modal-action">
          <button type="button" id="delete-event-btn" class="btn btn-error" style="display: none;">Удалить</button>
          <button type="button" id="close-modal-btn" class="btn btn-ghost">Отмена</button>
          <button type="submit" class="btn btn-primary">Сохранить</button>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>

</body>

</html>
