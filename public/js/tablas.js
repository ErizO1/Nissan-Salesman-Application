function Tabla() {
    this.container = $("<div>");
    this.tabla = $("<table>");
    this.thead = $("<thead>");
    this.tbody = $("<tbody>");
    this.tabla.append(this.thead).append(this.tbody);
    this.container.append(this.tabla);

    this.rows = [ ];
    this.classes = {
        table: [],
        thead: [],
        tbody: [],
        tr: [],
        th: [],
        td: [],
    };
}

Tabla.prototype.setHeader = function(header) {
    this.thead.html("");
    let hRow = $("<tr>").addClass(this.classes.tr.join(" "));
    $.each(header, (index, string) => {
        hRow.append($("<th>").append(string).addClass(this.classes.th.join(" ")));
    })
    this.thead.append(hRow);
}

Tabla.prototype.appendRow = function(row) {
    let tr = $("<tr>").addClass(this.classes.tr.join(" "));
    $.each(row, (index, cell) => {
        tr.append($("<td>").append(cell).addClass(this.classes.td.join(" ")));
    });

    this.rows.push(tr);
    this.tbody.append(tr);
}

Tabla.prototype.removeRow = function(row) {
    this.rows.slice(row, 1)[0].remove();
}

Tabla.prototype.cleanTable = function() {
    this.tbody.html("");
    this.rows = [];
}

Tabla.prototype.setClass = function(selector, cssClass) {
    switch (selector) {
        case "table":
        case "thead":
        case "tbody":
        case "tr":
        case "th":
        case "td":
            this.classes[selector] = [cssClass];
            break;
    }
    this.container.find(selector).removeClass().addClass(cssClass);
}

Tabla.prototype.addClass = function(selector, cssClass) {
    switch (selector) {
        case "table":
        case "thead":
        case "tbody":
        case "tr":
        case "th":
        case "td":
            this.classes[selector].push(cssClass);
            break;
    }
    this.container.find(selector).addClass(cssClass);
}

Tabla.prototype.getTable = function() {
    return this.container;
}