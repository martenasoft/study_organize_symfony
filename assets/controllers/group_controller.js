// setup an "add a User" link
var $addUserLink = $('<a href="#" class="add_User_link">Add a user</a>');
var $newLinkLi = $('<li></li>').append($addUserLink);

$(function() {
    // Get the ul that holds the collection of Users
    $collectionHolder = $('ul.users');

    // add the "add a User" anchor and li to the Users ul
    $collectionHolder.append($newLinkLi);

    $collectionHolder.find('li').each(function() {
        addUserFormDeleteLink($(this));
    });

    // count the current form inputs we have (e.g. 2), use that as the new
    // index when inserting a new item (e.g. 2)
    $collectionHolder.data('index', $collectionHolder.find(':input').length);

    $addUserLink.on('click', function(e) {
        // prevent the link from creating a "#" on the URL
        e.preventDefault();

        // add a new User form (see next code block)
        addUserForm($collectionHolder, $newLinkLi);
    });
});

function addUserForm($collectionHolder, $newLinkLi) {
    // Get the data-prototype explained earlier
    var prototype = $collectionHolder.data('prototype');

    // get the new index
    var index = $collectionHolder.data('index');

    // Replace '__name__' in the prototype's HTML to
    // instead be a number based on how many items we have
    var newForm = prototype.replace(/__name__/g, index);

    // increase the index with one for the next item
    $collectionHolder.data('index', index + 1);

    // Display the form in the page in an li, before the "Add a User" link li
    var $newFormLi = $('<li></li>').append(newForm);
    $newLinkLi.before($newFormLi);
}

function addUserFormDeleteLink($UserFormLi) {
    if ($UserFormLi.find('input').size() == 0) {
        return;
    }
    var $removeFormButton = $('<button type="button">Delete this User</button>');
    $UserFormLi.append($removeFormButton);

    $removeFormButton.on('click', function(e) {
        // remove the li for the User form
        $UserFormLi.remove();
    });
}