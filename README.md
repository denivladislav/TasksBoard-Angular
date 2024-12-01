# Tasks Board

[![CI](https://github.com/Angular-OTUS/ToDoList-VladislavDenisov-/actions/workflows/CI.yml/badge.svg)](https://github.com/Angular-OTUS/ToDoList-VladislavDenisov-/actions/workflows/CI.yml)

This app has two pages – Backlog and Board. User may add/edit/delete tasks with descriptions and toggle their status.
i18n is implemented via angular/localize (EN and RU locales).

<img width="1512" alt="tasks" src="https://github.com/user-attachments/assets/61e0f106-ae9a-440e-8ca0-2a9c50be6686">

### Stack
- TypeScript, Angular 18, RxJS, json-server
- Angular Material UI, scss, angular/localize
- ESlint, husky, prettier, stylelint, htmlhint

### How To Use Locally:
```bash
# Install Dependencies.
$ npm install

# Develop
(runs backend server and ports for both languages).
$ npm run start

# Lint.
$ make lint
