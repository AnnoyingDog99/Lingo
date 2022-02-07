export let formView = `
<style>
    #text-input{
        display: flex;
        justify-content: center;
        align-items: center;
        outline: red solid 3px;
        max-width: 500px;
        margin: 20px;
        transition: outline-color 0.5s;
    }
</style>
<form id="text-input">
    <custom-text-input></custom-text-input>
    <custom-button></custom-button>
</form>
`;
