#!/usr/bin/gjs --include-path=.
const Gio = imports.gi.Gio;
const gjsunit = imports.gjsunit;

// find all *_test.js files and import them
let dir = Gio.File.new_for_path('.');
let file;
try {
    file = dir.enumerate_children('standard::name,standard::type', Gio.FileQueryInfoFlags.NONE, null);
    let info;
    let regex = /(_test)\.js$/;
    while ((info = file.next_file(null))) {
        let name = file.get_child(info).get_basename();
        if (name.match(regex)) {
            imports[name.replace(regex, '$1')];
        }
    }
    gjsunit.instance.run();
} catch (e) {
    print('Error running tests: ' + e);
}
