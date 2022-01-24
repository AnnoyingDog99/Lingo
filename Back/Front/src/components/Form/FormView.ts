export let formView = `
<style>
    #text-input{
        display: flex;
        justify-content: center;
        align-items: center;
        outline: #00ff00 solid 3px;
        max-width: 500px;
        margin: 20px;
    }
</style>
<form id="text-input">
    <custom-text-input minlength="5" maxlength="5"></custom-text-input>
    <custom-button></custom-button>
</form>
`;
