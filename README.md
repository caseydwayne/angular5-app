# Angular5 App

A single page application (SPA) made using Angular 5, Angular Material, and the Angular CDK.

## What It Does

Lists events, toggles RSVP.

## Why It Exists

This app was built as an interview assignment.

## How It's Made

The code was made to work against a wonky API. It features resiliant HTTP requests to counter the random failures and invalid responses of the API server (according to legend, it's meant to simulate poor network conditions on mobile devices). 

Graceful fallbacks are in place to notify users of users of problems and, when possible, make it seem like there isn't one (as in the case of the random failures on requests for image).

The server required authentication for every request, which meant images could not be accessed directly. A reverse proxy was used to bypass the CORS restrictions (and would be promptly removed prior to real-world use).