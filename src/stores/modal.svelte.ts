export const TaskModal = CreateTaskModal()
function CreateTaskModal (){
    let opened = $state(false)
    function get(){
        return opened;
    }

    function open(){
        opened = true
    }

    function close(){
        opened = false
    }
    return {get, open, close}
}