$('document').ready(() => {
    $('.delete-book').on('click', event => {
        $target = $(event.target)
        const id = $target.attr('data-id')
        console.log(id)
        $.ajax({
            type: 'DELETE',
            url: '/books/delete/'+id,
            success: res => {
                alert("Deleting this article!")
                window.location.href = '/'
            },
            error: err => {
                console.log(err)
            }
        })
    })
})