export let customButtonView = `
<style>
#button{
    outline: red solid 3px;
    height: 100%;
    cursor: pointer;
    text-align: center;
    transition: outline-color 0.5s;
  }
  
  #button img{
    padding: 10px 20px 10px 20px;
    width: 30px;
  }
  
  #button:hover{
    background-color: black;
  }
</style>

<div id="button">
    <img src="" alt=""/>
</div>
`;
