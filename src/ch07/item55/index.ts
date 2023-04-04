{
    function handleDrag(eDown: Event) {
        const targetEl = eDown.currentTarget;
        targetEl.classList.add('dragging');

        const dragStart = [eDown.clientX, eDown.clientY];
        const handleUp (eUp: Event) => {
            targetEl.classList.remove('dragging');
            targetEl?.removeEventListener('mouseup', handleUp);
            const dragEnd = [eUp.clientX, eUp.clientY];
            console.log('dx, dy = ', [0, 1].map(i=>dragEnd[i] - dragStart[i]));
        }
        targetEl.addEventListener('mouseup', handleUp);
    }

    const div = document.getElementById('surface');
    div.addEventListener('mousedown', handleDrag);
}

{
    function addDragHandler(el: HTMLElement) {
        el.addEventListener('mousedown', eDown => {
            const dragStart = [eDown.clientX, eDown.clientY];
            const handleUp = (eUp: MouseEvent) => {
                el.classList.remove('dragging');
                el.removeEventListener('mouseup', handleUp);
                const dragEnd = [eUp.clientX, eUp.clientY];
                console.log('dx, dy = ', [0, 1].map(i => dragEnd[i] - dragStart[i]));
            }
            el.addEventListener('mouseup', handleUp);
        });
    }

    const div = document.getElementById('surface');
    if (div) {
        addDragHandler(div);
    }
}