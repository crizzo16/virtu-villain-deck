let virtu = {
    rules: [],
    allVillains: [],
    allMasterminds: [],
    allHenchmen: [],
    allBystanders: [],
    allLocations: [],
    gamePeeps: [
        {
            type: "other",
            name: "Shapeshifted Copycat",
            id: 532,
            cards: [
                {
                    type: "other",
                    main: "Shapeshifted Copycat",
                    name: "Shapeshifted Copycat",
                    id: 5321,
                    img: "https://marveldbg.com/wp-content/uploads/2019/09/bystander-shapeshifter-copycat.jpg",
                    attack: 3,
                    vp: 1,
                    special: ""
                }
            ]
        }
    ],
    gameDudes: [],
    gameLocals: [],
    gameBystanders: [[], [], [], [], []],
    escapedConvicts: [],
    victoryPile: [],
    fightModal: [],
    sortMethod: "",
    deckSelectedCard: "",
    parseJsons: function () {
        // Load in Villains
        $.ajax({
            url: "https://raw.githubusercontent.com/crizzo16/virtu-villain-deck/main/assets/villains.json",
            dataType: "json"
        }).done(function (result) {
            virtu.allVillains = result;
            virtu.loadBadDudes();
        });

        // Load in Masterminds
        $.ajax({
            url: "https://raw.githubusercontent.com/crizzo16/virtu-villain-deck/main/assets/masterminds.json",
            dataType: "json"
        }).done(function (result) {
            virtu.allMasterminds = result;
            virtu.loadBadDudes();
            virtu.countVP();
            virtu.countEscapedBystanders();
        });

        // Load in Henchmen
        $.ajax({
            url: "https://raw.githubusercontent.com/crizzo16/virtu-villain-deck/main/assets/henchmen.json",
            dataType: "json"
        }).done(function (result) {
            virtu.allHenchmen = result;
            virtu.loadBadDudes();
        });

        // Load in Locations

        // Load in Bystanders
        $.ajax({
            url: "https://raw.githubusercontent.com/crizzo16/virtu-villain-deck/main/assets/bystanders.json",
            dataType: "json"
        }).done(function (result) {
            virtu.allBystanders = result;
            virtu.loadBadDudes();
            virtu.loadGamePeeps();
        });

        // Load in others

        // Load in Rules
        $.ajax({
            url: "https://raw.githubusercontent.com/crizzo16/virtu-villain-deck/main/assets/rules.json",
            dataType: "json"
        }).done(function (result) {
            virtu.rules = result;
            virtu.loadRules();
        });

    },
    loadRules: function () {
        virtu.rules.forEach(function (item, index, array) {
            let total = $("<ul>");

            let ruleName = $("<span>")
                .addClass("font-bold")
                .text(item.name + ": ");
            total.append(ruleName).append(item.description + " [" + item.set + "]");

            $("#rules-go-here").append(total);
        });
    },
    loadBadDudes: function () {
        $("#all-master").html("");
        $("#all-villain").html("");
        $("#all-hench").html("");
        let checking = "";

        // Masterminds first
        virtu.allMasterminds.forEach(function (item, index, array) {
            let newCard = $("<ul>").addClass("all-master-card pointer").attr("set-id", item.id).attr("type", item.type);
            let dudeName = $("<span>").addClass("font-bold").text(item.name);
            newCard.append(dudeName);

            $("#all-master").append(newCard);
        });

        virtu.allVillains.forEach(function (item, index, array) {
            let newCard = $("<ul>").addClass("all-master-card pointer").attr("set-id", item.id).attr("type", item.type);
            let dudeName = $("<span>").addClass("font-bold").text(item.name);
            newCard.append(dudeName);

            $("#all-villain").append(newCard);
        });

        virtu.allHenchmen.forEach(function (item, index, array) {
            let newCard = $("<ul>").addClass("all-master-card pointer").attr("set-id", item.id).attr("type", item.type);
            let dudeName = $("<span>").addClass("font-bold").text(item.name);
            newCard.append(dudeName);

            $("#all-hench").append(newCard);
        });
    },
    countVP: function () {
        let count = 0;
        virtu.victoryPile.forEach(function (item, index, array) {
            count += item.vp;
        });
        $("#vp-points").html("");
        $("#vp-points").text(count);
    },
    countEscapedBystanders: function () {
        let count = 0;
        virtu.escapedConvicts.forEach(function (item, index, array) {
            if (item.type == "bystander") {
                count++;
            }
        });
        $("#esc-by").html("").text(count);
    },
    addCity: function () {
        //look at incoming card

        //check type

        if (type === "bystander") {
            // add card to earliest villain
            //otherwise add it to mastermind
        } else if (type === "location") {
            // add to location
        } else if (type === "mastermind") {
            // dont add it to the city 
        } else {
            // assume card is villain or henchman

        }

        virtu.loadCity();
    },
    loadCity: function () {
        // Load Main bad guys
        let sewers = "";
        let bank = "";
        let rooftops = "";
        let streets = "";
        let bridge = "";
        // Sewers
        if (virtu.gameDudes.length > 0 && virtu.gameDudes[0] != undefined) { sewers = $("<img>").addClass("img city-card").attr("card-id", virtu.gameDudes[0].id).attr("index", 0).attr("src", virtu.gameDudes[0].img); }
        // Bank
        if (virtu.gameDudes.length > 1 && virtu.gameDudes[1] != undefined) { bank = $("<img>").addClass("img city-card").attr("card-id", virtu.gameDudes[1].id).attr("index", 1).attr("src", virtu.gameDudes[1].img); }
        // Rooftops
        if (virtu.gameDudes.length > 2 && virtu.gameDudes[2] != undefined) { rooftops = $("<img>").addClass("img city-card").attr("card-id", virtu.gameDudes[2].id).attr("index", 2).attr("src", virtu.gameDudes[2].img); }
        // Streets
        if (virtu.gameDudes.length > 3 && virtu.gameDudes[3] != undefined) { streets = $("<img>").addClass("img city-card").attr("card-id", virtu.gameDudes[3].id).attr("index", 3).attr("src", virtu.gameDudes[3].img); }
        // Bridge
        if (virtu.gameDudes.length > 4 && virtu.gameDudes[4] != undefined) { bridge = $("<img>").addClass("img city-card").attr("card-id", virtu.gameDudes[4].id).attr("index", 4).attr("src", virtu.gameDudes[4].img); }

        // Load Bystanders
        let a = $("<div>").addClass("many-bystanders");
        if (virtu.gameBystanders.length > 0) {
            virtu.gameBystanders[0].forEach(function (item, index, aray) {
                const temp = $("<img>").addClass("bystander").attr("src", item.img);
                a.append(temp);
            });
        }
        let b = $("<div>").addClass("many-bystanders");
        if (virtu.gameBystanders.length > 1) {
            virtu.gameBystanders[1].forEach(function (item, index, aray) {
                const temp = $("<img>").addClass("bystander").attr("src", item.img);
                b.append(temp);
            });
        }
        let c = $("<div>").addClass("many-bystanders");
        if (virtu.gameBystanders.length > 2) {
            virtu.gameBystanders[2].forEach(function (item, index, aray) {
                const temp = $("<img>").addClass("bystander").attr("src", item.img);
                c.append(temp);
            });
        }
        let d = $("<div>").addClass("many-bystanders");
        if (virtu.gameBystanders.length > 3) {
            virtu.gameBystanders[3].forEach(function (item, index, aray) {
                const temp = $("<img>").addClass("bystander").attr("src", item.img);
                d.append(temp);
            });
        }
        let e = $("<div>").addClass("many-bystanders");
        if (virtu.gameBystanders.length > 4) {
            virtu.gameBystanders[04].forEach(function (item, index, aray) {
                const temp = $("<img>").addClass("bystander").attr("src", item.img);
                e.append(temp);
            });
        }

        // Load it all up
        $("#c-sewers").html("").append(sewers).append(a);
        $("#c-bank").html("").append(bank).append(b);
        $("#c-rooftops").html("").append(rooftops).append(c);
        $("#c-streets").html("").append(streets).append(d);
        $("#c-bridge").html("").append(bridge).append(e);
    },
    loadGamePeeps: function () {
        $("#gamePeeps-here").html("");
        // Load in Bystanders
        let chest = $("<ul>").addClass("m-10");
        let head = $("<div>").text("Bystanders").addClass("mini-header");
        chest.append(head);
        virtu.allBystanders.forEach(function (item, index, array) {
            let person = $("<li>").text(item.name).attr("set-id", item.id).attr("type", item.type).addClass("city-by");
            chest.append(person);
        });
        $("#gamePeeps-here").append(chest);
        //Load in everything else
        virtu.gamePeeps.forEach(function (item, index, array) {
            let box = $("<ul>").addClass("m-10");
            let header = $("<div>").text(item.name).addClass("mini-header").attr("set-id", item.id);
            box.append(header);
            item.cards.forEach(function (a, b, c) {
                let temp = $("<li>").text(a.name).attr("set-id", item.id).attr("card-id", a.id).attr("type", a.type).addClass("game-card");
                if (item.type == "henchmen" || item.type == "villain" || item.type == "other") {
                    temp.addClass("cityable");
                }
                box.append(temp);
            });
            $("#gamePeeps-here").append(box);
        });
    },
    loadVictoryPile: function () {
        $("#vp-cards-here").html("");
        virtu.victoryPile.forEach(function (item, index, array) {
            let text = item.name + " - " + item.main;
            let temp = $("<li>").addClass("vp-card").attr("set-id", item.id).text(text);
            $("#vp-cards-here").append(temp);
        });
    },
    loadEscapees: function () {
        $("#escapees-here").html("");
        virtu.escapedConvicts.forEach(function (item, index, array) {
            let text = item.name + " - " + item.main;
            let temp = $("<li>").addClass("escapee-card").attr("set-id", item.id).attr("type", item.type).text(text);
            $("#escapees-here").append(temp);
        });
        virtu.countEscapedBystanders();
    },
    selectVPCard: function () {
        const selected = $(".vp-card-highlight").attr("set-id");
        const id = $(this).attr("set-id");
        $(".vp-card-highlight").removeClass("vp-card-highlight");
        if (selected != id) {
            $(this).addClass("vp-card-highlight");
        }
    },
    selectMainDude: function () {
        const selected = $(".all-master-highlight").attr("set-id");
        const id = $(this).attr("set-id");
        $(".all-master-highlight").removeClass("all-master-highlight");
        if (selected != id) {
            $(this).addClass("all-master-highlight");
        }
    },
    selectGameDude: function () {
        const selected = $(".game-highlight").attr("set-id");
        const id = $(this).attr("set-id");
        $(".game-highlight").removeClass("game-highlight");
        if (selected != id) {
            $(this).addClass("game-highlight");
        }
    },
    selectCityDude: function () {
        const selected = $(".city-highlight").attr("card-id");
        const id = $(this).attr("card-id");
        $(".city-highlight").removeClass("city-highlight");
        if (selected != id) {
            $(this).addClass("city-highlight");
        }
    },
    selectBystander: function () {
        const selected = $(".bystander-highlight").attr("set-id");
        const id = $(this).attr("set-id");
        $(".bystander-highlight").removeClass("bystander-highlight");
        if (selected != id) {
            $(this).addClass("bystander-highlight");
        }
    },
    addToGame: function () {
        const id = $(".all-master-highlight").attr("set-id");
        const type = $(".all-master-highlight").attr("type");
        $(".all-master-highlight").removeClass("all-master-highlight");

        if (type === "mastermind") {
            for (let i = 0; i < virtu.allMasterminds.length; i++) {
                if (id == virtu.allMasterminds[i].id) {
                    virtu.gamePeeps.push(virtu.allMasterminds[i]);
                    virtu.loadGamePeeps();
                    return;
                }
            }
        } else if (type === "villain") {
            for (let i = 0; i < virtu.allVillains.length; i++) {
                if (id == virtu.allVillains[i].id) {
                    virtu.gamePeeps.push(virtu.allVillains[i]);
                    virtu.loadGamePeeps();
                    return;
                }
            }
        } else if (type === "henchmen") {
            for (let i = 0; i < virtu.allHenchmen.length; i++) {
                if (id == virtu.allHenchmen[i].id) {
                    virtu.gamePeeps.push(virtu.allHenchmen[i]);
                    virtu.loadGamePeeps();
                    return;
                }
            }
        }
    },
    addVictoryPile: function () {
        const dudeID = $(".game-highlight").attr("set-id");
        const cardID = $(".game-highlight").attr("card-id");
        $(".game-highlight").removeClass("game-highlight");
        for (i = 0; i < virtu.gamePeeps.length; i++) {
            if (dudeID == virtu.gamePeeps[i].id) {
                for (j = 0; j < virtu.gamePeeps[i].cards.length; j++) {
                    if (cardID == virtu.gamePeeps[i].cards[j].id) {
                        virtu.victoryPile.push(virtu.gamePeeps[i].cards[j]);
                        virtu.countVP();
                        virtu.loadVictoryPile();
                        return;
                    }
                }
            }
        }
    },
    addCity: function () {
        if ($(".game-highlight").hasClass("cityable")) {
            // Grab important info before un-highlighting it
            const dudeID = $(".game-highlight").attr("set-id");
            const cardID = $(".game-highlight").attr("card-id");
            const type = $(".game-highlight").attr("type");
            $(".game-highlight").removeClass("game-highlight");

            // Add to beginning of city array
            virtu.gamePeeps.forEach(function (item, index, array) {
                // look for right person
                if (dudeID == item.id) {
                    item.cards.forEach(function (a, b, c) {
                        // look for right card
                        if (cardID == a.id) {
                            virtu.gameDudes.unshift(a); // add card
                            virtu.removeSpaces(1); // remove spaces
                            virtu.checkEscapees();
                            virtu.shiftBystanders();
                            virtu.loadCity();
                            return;
                        }
                    });
                }
            });
        }
    },
    addBystander: function () {
        const id = $(".bystander-highlight").attr("set-id");
        $(".bystander-highlight").removeClass("bystander-highlight");
        let done = true;
        // only do this if the array has stuff
        if (virtu.gameDudes.length > 0) {
            for (let i = 0; i < virtu.gameDudes.length; i++) {
                if (virtu.gameDudes[i] != undefined && done) {
                    virtu.allBystanders.forEach(function (item, index, array) {
                        if (id == item.id) {
                            virtu.gameBystanders[i].push(item);
                            virtu.loadCity();
                            done = false;
                            return;
                        }
                    });
                }
            }
        }

    },
    addByBank: function () {
        if (virtu.gameDudes.length > 1 && virtu.gameDudes[1] != undefined) {
            const id = $(".bystander-highlight").attr("set-id");
            $(".bystander-highlight").removeClass("bystander-highlight");
            virtu.allBystanders.forEach(function (item, index, array) {
                if (id == item.id) {
                    virtu.gameBystanders[1].push(item);
                    virtu.loadCity();
                    console.log(virtu.gameBystanders);
                    return;
                }
            });
        } else {
            M.toast({
                html: "There's no one in the bank!"
            });
        }
    },
    shiftBystanders: function () {
        let i = 4;
        for (m = 0; m < 5; m++) {
            if (i == 4) {
                let done = virtu.gameBystanders[4].length;
                for (let j = 0; j < done; j++) {
                    virtu.escapedConvicts.push(virtu.gameBystanders[4].shift());
                }
            } else {
                let done = virtu.gameBystanders[i].length;
                for (let k = 0; k < done; k++) {
                    virtu.gameBystanders[i + 1].push(virtu.gameBystanders[i].shift());
                }
            }
            i = i - 1;
        }
    },
    removeSpaces: function (amount) {
        let count = 0;
        for (let i = 0; i < virtu.gameDudes.length; i++) {
            if (virtu.gameDudes[i] == undefined) {
                virtu.gameDudes.splice(i, 1);
                count++;
                if (count == amount) return;
            }
        }
    },
    checkEscapees: function () {
        if (virtu.gameDudes.length > 5) {
            for (let i = 5; i < virtu.gameDudes.length; i++) {
                // only add to escapee pile if actual card
                if (virtu.gameDudes[i] != undefined) {
                    virtu.escapedConvicts.push(virtu.gameDudes[i]);
                }
                virtu.gameDudes.splice(i, 1);
            }
            virtu.loadEscapees();
        }
    },
    removeVictoryPile: function () {
        const id = $(".vp-card-highlight").attr("set-id");
        virtu.victoryPile.forEach(function (item, index, array) {
            if (item.id == id) {
                virtu.victoryPile.splice(index, 1);
                virtu.loadVictoryPile();
                virtu.countVP();
                return;
            }
        });
    },
    fight: function () {
        const cardID = $(".city-highlight").attr("card-id");
        const index = $(".city-highlight").attr("index");
        $(".city-highlight").removeClass("city-highlight");
        virtu.fightModal.push(virtu.gameDudes[index]);
        virtu.gameBystanders[index].forEach(function (item, index, array) {
            virtu.fightModal.push(item);
        });
        $("#fight-modal-content").html("");
        virtu.fightModal.forEach(function (item, index, array) {
            let img = $("<img>").attr("src", item.img).addClass("modal-img");
            $("#fight-modal-content").append(img);
        });
        delete virtu.gameDudes[index];
        const done = virtu.gameBystanders[index].length;
        for (let i = 0; i < done; i++) {
            virtu.gameBystanders[index].shift();
        }
        virtu.loadCity();
    },
    doneFight: function () {
        let done = virtu.fightModal.length;
        for (let i = 0; i < done; i++) {
            virtu.victoryPile.push(virtu.fightModal.shift());
        }
        virtu.loadVictoryPile();
        virtu.countVP();
    },
    otherfought: function () {
        const index = $(".city-highlight").attr("index");
        $(".city-highlight").removeClass("city-highlight");
        delete virtu.gameDudes[index];
        const done = virtu.gameBystanders[index].length;
        for (let i = 0; i < done; i++) {
            virtu.gameBystanders[index].shift();
        }
        virtu.loadCity();
    }
};

$(document).ready(function () {
    $(".collapsible").collapsible();
    $(".modal").modal();
    virtu.parseJsons();
    virtu.loadGamePeeps();
});

$(document).on("click", ".all-master-card", virtu.selectMainDude);
$(document).on("click", ".game-card", virtu.selectGameDude);
$(document).on("click", ".vp-card", virtu.selectVPCard);
$(document).on("click", ".city-card", virtu.selectCityDude);
$(document).on("click", ".city-by", virtu.selectBystander);
$(document).on("click", "#add-game", virtu.addToGame);
$(document).on("click", "#add-vp", virtu.addVictoryPile);
$(document).on("click", "#add-city", virtu.addCity);
$(document).on("click", "#by-to-bank", virtu.addByBank);
$(document).on("click", "#by-to-city", virtu.addBystander);
$(document).on("click", "#remove-vp", virtu.removeVictoryPile);
$(document).on("click", "#fight-modal-btn", virtu.fight);
$(document).on("click", "#fight-done", virtu.doneFight);
$(document).on("click", "#other-fought", virtu.otherfought);