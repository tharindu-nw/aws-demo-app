$('document').ready(() => {
    $('.delete-book').on('click', event => {
        $target = $(event.target)
        const id = $target.attr('data-id')
        $.ajax({
            type: 'DELETE',
            url: '/books/'+id,
            success: res => {
                alert("Deleting this article!")
                window.location.href = '/'
            },
            error
        })
    })
})