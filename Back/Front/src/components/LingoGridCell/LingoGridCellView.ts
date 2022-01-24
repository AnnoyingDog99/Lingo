export let lingoGridCellView = `
<style>
    .lingo-grid-cell{
        font-size: 3ch;
        outline: #ee6c4d solid 2px;
        display: flex;
        align-content: center;
        justify-content: center;
        flex-direction: column;
        padding: 0.4em;
    }

    .lingo-grid-cell div{
        height: 80px;
        width: 80px;
        border-radius: 50%;
        display: flex;
        align-content: center;
        justify-content: center;
        flex-direction: column;
    }

    .lingo-grid-cell div p{
        margin: 0;
        padding: 0;
    }

    .correct-place{
        border: #00ff00 solid 2px;
    }

    .correct{
        border: yellow solid 2px;
    }
</style>

<div class="lingo-grid-cell">
    <div class="wrong-place">
        <p class="letter"></p>
    </div>
</div>
`;
