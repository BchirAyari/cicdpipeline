import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
interface Person {
    context(arg0: string, arg1: boolean, arg2: RegExp): unknown;
    name: string;
    age: number;
  }

declare const require: Person;

// Initialise l'environnement de test Angular.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Recherche tous les fichiers de test.
export const context = require.context('./', true, /\.spec\.ts$/);

