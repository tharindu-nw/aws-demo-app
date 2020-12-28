$('document').ready(() => {
    $('.delete-book').on('click', event => {
        $target = $(event.target)
        const id = $target.attr('data-id')
    })
})