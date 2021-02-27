let virtu = {
    rules: [],
    allVillains: [],
    allMasterminds: [],
    allHenchmen: [],
    gameDudes: [],
    gameLocals: [],
    gameBystanders: [],
    victoryPile: [],
    sortMethod: "",
    escape: [],
    deckSelectedCard: "",

};

$(document).ready(function() {
    $(".collapsible").collapsible();
    $(".modal").modal();
});