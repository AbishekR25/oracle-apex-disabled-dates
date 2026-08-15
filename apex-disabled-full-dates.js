function markFullDates() {
    var raw = $v('P28_FULL_DATES');

    if (!raw) {
        return;
    }

    var fullDates = raw.split(',').map(function(s){ return s.trim(); });

    var $calendar = $('#P28_TICKET_BOOKING_calendar');

    if ($calendar.length === 0) {
        return;
    }

    var $title = $calendar.find('.a-DatePicker-calendarTitle').first();
    var titleText = $title.text().trim();

    var parts = titleText.split(' ');
    if (parts.length < 2) {
        return;
    }

    var monthNames = ["January","February","March","April","May","June",
                       "July","August","September","October","November","December"];
    var monthIndex = monthNames.indexOf(parts[0]);
    var year = parts[1];

    if (monthIndex === -1 || !year) {
        return;
    }

    var monthStr = String(monthIndex + 1).padStart(2, '0');

    var $cells = $calendar.find('td');

    var matchCount = 0;
    var checkedCount = 0;

    $cells.each(function(i) {
        var $cell = $(this);
        var $span = $cell.find('span').first();
        if ($span.length === 0) return;

        var dayNum = parseInt($span.text().trim(), 10);
        if (isNaN(dayNum)) return;

        checkedCount++;
        var dayStr = String(dayNum).padStart(2, '0');
        var cellDate = year + '-' + monthStr + '-' + dayStr;

        if (fullDates.indexOf(cellDate) > -1) {
            matchCount++;
            $cell.addClass('u-date-full')
                 .attr('aria-disabled', 'true')
                 .attr('tabindex', '-1');

            $cell.off('click.dateFull mousedown.dateFull')
                 .on('click.dateFull mousedown.dateFull', function(e) {
                     e.preventDefault();
                     e.stopImmediatePropagation();
                     return false;
                 });
        }
    });
}

var bodyObserver = new MutationObserver(function(mutations) {
    var calendarEl = document.getElementById('P28_TICKET_BOOKING_calendar');
    if (calendarEl) {
        markFullDates();
    }
});

bodyObserver.observe(document.body, { childList: true, subtree: true });
