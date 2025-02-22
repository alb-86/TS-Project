import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
    const fulllist = FullList.instance
    const template = ListTemplate.instance

    const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement
    itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
        event.preventDefault()

        const input = document.getElementById("newItem") as HTMLInputElement
        const newEntryText: string = input.value.trim()
        if (!newEntryText) return

        const itemId: number = fulllist.list.length
            ? parseInt(fulllist.list[fulllist.list.length - 1].id) + 1
            : 1
        
        const newItem = new ListItem(itemId.toString(), newEntryText)

        fulllist.addItem(newItem)
        template.render(fulllist)
    })

    const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement

    clearItems.addEventListener('click', (): void => {
        fulllist.clearList()
        template.clear()
    })

    fulllist.load()
    template.render(fulllist)
}

document.addEventListener('DOMContentLoaded', initApp)