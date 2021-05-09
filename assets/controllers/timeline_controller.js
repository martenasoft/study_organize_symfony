window.loadTimelineBody = function (url, obj) {
    let checklistItem = $(obj).closest('.widget-box').find('.checklist-items');
    if (checklistItem.find('.message-list').size() > 0) {
        return ;
    }
    $.get(url, function (data) {
        checklistItem.html(data);
    });
    return false;
}