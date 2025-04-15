document.addEventListener("DOMContentLoaded", function () {
    const allRegions = {
        "Pobrzeże koszalińskie": ["zachodniopomorskie"],
        "Jezioro Żarnowieckie": ["pomorskie"],
        "Wyspa Wolin": ["zachodniopomorskie"],
        "Warmia": ["warmińsko-mazurskie"],
        "Jezioro Łebsko": ["pomorskie"],
        "Jezioro Gardno": ["pomorskie"],
        "Jezioro Wigry": ["podlaskie"],
        "Jezioro Gopło": ["kujawsko-pomorskie", "wielkopolskie"],
        "Jezioro Śniardwy": ["warmińsko-mazurskie"],
        "Jezioro Druzno": ["warmińsko-mazurskie"],
        "Jezioro Niegocin": ["warmińsko-mazurskie"],
        "Zalew Szczeciński": ["zachodniopomorskie"],
        "Zatoka Pucka": ["pomorskie"],
        "Białystok": ["podlaskie"],
        "Bydgoszcz": ["kujawsko-pomorskie"],
        "Gdańsk": ["pomorskie"],
        "Gorzów Wielkopolski": ["lubuskie"],
        "Katowice": ["śląskie"],
        "Kielce": ["świętokrzyskie"],
        "Kraków": ["małopolskie"],
        "Lublin": ["lubelskie"],
        "Łódź": ["łódzkie"],
        "Olsztyn": ["warmińsko-mazurskie"],
        "Opole": ["opolskie"],
        "Poznań": ["wielkopolskie"],
        "Rzeszów": ["podkarpackie"],
        "Szczecin": ["zachodniopomorskie"],
        "Toruń": ["kujawsko-pomorskie"],
        "Warszawa": ["mazowieckie"],
        "Wrocław": ["dolnośląskie"],
        "Pojezierze Kaszubskie": ["pomorskie"],
        "Pojezierze Drawskie": ["zachodniopomorskie"],
        "Bory Tucholskie": ["kujawsko-pomorskie", "pomorskie"],
        "Pojezierze Iławskie": ["warmińsko-mazurskie"],
        "Pojezierze Myśliborskie": ["zachodniopomorskie"],
        "Pojezierze Suwalskie": ["podlaskie"],
        "Pojezierze Mazurskie": ["warmińsko-mazurskie"],
        "Żuławy Wiślane": ["pomorskie", "warmińsko-mazurskie"],
        "Kotlina Warszawska": ["mazowieckie"],
        "Kotlina Kłodzka": ["dolnośląskie"],
        "Kotlina Sandomierska": [
            "podkarpackie",
            "świętokrzyskie",
            "małopolskie",
            "lubelskie",
        ],
        "Kotlina Oświęcimska": ["małopolskie"],
        "Szeskie Wzgórza": ["warmińsko-mazurskie"],
        "Wzgórza Ostrzeszowskie": ["wielkopolskie"],
        "Wzgórza Ostrołęckie": ["mazowieckie"],
        "Wzgórza Dalkowskie": ["lubuskie", "dolnośląskie"],
        "Nizina Śląska": ["dolnośląskie", "opolskie"],
        "Nizina Mazowiecka": ["mazowieckie"],
        "Nizina Wielkopolska": ["wielkopolskie"],
        "Wyżyna Lubelska": ["lubelskie"],
        "Roztocze": ["lubelskie", "podkarpackie"],
        "Wyżyna Małopolska": ["małopolskie", "świętokrzyskie"],
        "Wyżyna Śląska": ["śląskie"],
        "Wyżyna Krakowsko-Częstochowska": ["małopolskie", "śląskie"],
        "Tatry": ["małopolskie"],
        "Pieniny": ["małopolskie"],
        "Podhale": ["małopolskie"],
        "Bieszczady": ["podkarpackie"],
        "Beskidy": ["małopolskie", "śląskie", "podkarpackie"],
        "Góry Świętokrzyskie": ["świętokrzyskie"],
        "Łysogóry": ["świętokrzyskie"],
        "Sudety": ["dolnośląskie", "opolskie"],
        "Karkonosze": ["dolnośląskie"],
        "Góry Stołowe": ["dolnośląskie"],
        "Góry Izerskie": ["dolnośląskie"],
        "Góry Kaczawskie": ["dolnośląskie"],
        "Rzeka Wisła": [
            "śląskie",
            "małopolskie",
            "świętokrzyskie",
            "mazowieckie",
            "kujawsko-pomorskie",
            "pomorskie",
        ],
        "Rzeka Odra": [
            "śląskie",
            "opolskie",
            "dolnośląskie",
            "lubuskie",
            "zachodniopomorskie",
        ],
        "Rzeka Warta": [
            "śląskie",
            "łódzkie",
            "wielkopolskie",
            "lubuskie",
            "zachodniopomorskie",
        ],
        "Rzeka San": ["podkarpackie", "lubelskie"],
        "Rzeka Bug": ["lubelskie", "mazowieckie", "podlaskie"],
        "Rzeka Dunajec": ["małopolskie", "podkarpackie"],
    };

    const allProvinces = [];
    for (const region in allRegions) {
        for (const province of allRegions[region]) {
            if (!allProvinces.includes(province)) {
                allProvinces.push(province);
            }
        }
    }
    allProvinces.sort();

    let currentQuiz = {};
    let currentMode = "text";
    let currentStep = 0;
    let correctAnswers = 0;
    const totalSteps = parseInt(prompt("Liczba pytań: "));

    function getRandomRegions(count) {
        const regions = Object.keys(allRegions);
        const selected = {};
        const result = {};

        count = Math.min(count, regions.length);

        while (Object.keys(selected).length < count) {
            const randomIndex = Math.floor(Math.random() * regions.length);
            const region = regions[randomIndex];

            if (!selected[region]) {
                selected[region] = true;
                result[region] = allRegions[region];
            }
        }

        return result;
    }

    function generateTextInput(index) {
        const input = document.createElement("input");
        input.type = "text";
        input.id = "area" + index;
        input.placeholder = "Wpisz województwo(a)";
        return input;
    }

    function generateSelectSystem(index) {
        const container = document.createElement("div");
        container.id = "selectContainer" + index;
        container.className = "selectContainer";

        const selectedDisplay = document.createElement("div");
        selectedDisplay.id = "selectedProvinces" + index;
        selectedDisplay.className = "selectedProvinces";
        container.appendChild(selectedDisplay);

        const select = document.createElement("select");
        select.id = "provinceSelect" + index;

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Wybierz województwo";
        defaultOption.selected = true;
        select.appendChild(defaultOption);

        for (const province of allProvinces) {
            const option = document.createElement("option");
            option.value = province;
            option.textContent = province;
            select.appendChild(option);
        }

        const addButton = document.createElement("button");
        addButton.className = "addProvinceBtn";
        addButton.textContent = "Dodaj województwo";
        addButton.type = "button";

        const selectedProvinces = [];

        const hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.id = "area" + index;
        hiddenInput.value = JSON.stringify(selectedProvinces);
        container.appendChild(hiddenInput);

        addButton.addEventListener("click", function () {
            const selectedValue = select.value;
            if (selectedValue && !selectedProvinces.includes(selectedValue)) {
                selectedProvinces.push(selectedValue);
                updateSelectedDisplay();
                hiddenInput.value = JSON.stringify(selectedProvinces);
                select.value = "";
            }
        });

        function updateSelectedDisplay() {
            selectedDisplay.innerHTML = "";

            if (selectedProvinces.length === 0) {
                selectedDisplay.textContent = "Brak wybranych województw";
                return;
            }

            for (let i = 0; i < selectedProvinces.length; i++) {
                const province = selectedProvinces[i];
                const tag = document.createElement("span");
                tag.className = "provinceTag";
                tag.textContent = province;

                const removeBtn = document.createElement("span");
                removeBtn.className = "remove";
                removeBtn.textContent = "×";
                removeBtn.addEventListener("click", function () {
                    selectedProvinces.splice(i, 1);
                    updateSelectedDisplay();
                    hiddenInput.value = JSON.stringify(selectedProvinces);
                });

                tag.appendChild(removeBtn);
                selectedDisplay.appendChild(tag);
            }
        }

        updateSelectedDisplay();

        container.appendChild(select);
        container.appendChild(addButton);

        return container;
    }

    function generateQuiz() {
        currentQuiz = getRandomRegions(totalSteps);
        currentStep = 0;
        correctAnswers = 0;
        updateProgress();
        showCurrentQuestion();
    }

    function showCurrentQuestion() {
        const container = document.getElementById("questionContainer");
        container.innerHTML = "";

        if (currentStep >= totalSteps) {
            showResults();
            return;
        }

        const regions = Object.keys(currentQuiz);
        if (currentStep < regions.length) {
            const region = regions[currentStep];

            const card = document.createElement("div");
            card.className = "questionCard";

            const title = document.createElement("div");
            title.className = "questionTitle";
            title.textContent = `Do jakiego województwa należy: ${region}?`;

            const inputContainer = document.createElement("div");
            if (currentMode === "text") {
                inputContainer.appendChild(generateTextInput(1));
            } else {
                inputContainer.appendChild(generateSelectSystem(1));
            }

            const feedback = document.createElement("div");
            feedback.className = "feedback";
            feedback.id = "feedback1";

            card.appendChild(title);
            card.appendChild(inputContainer);
            card.appendChild(feedback);

            container.appendChild(card);
        }
    }

    function updateProgress() {
        const progressBar = document.getElementById("progress");
        const percentage = (currentStep / totalSteps) * 100;
        progressBar.style.width = `${percentage}%`;
    }

    function getSelectedProvinces(index) {
        if (currentMode === "text") {
            const input = document.getElementById("area" + index);
            return input.value
                .split(",")
                .map((province) => province.trim())
                .filter((province) => province !== "");
        } else {
            const input = document.getElementById("area" + index);
            try {
                return JSON.parse(input.value);
            } catch (e) {
                return [];
            }
        }
    }

    function checkAnswers() {
        const regions = Object.keys(currentQuiz);
        if (currentStep < regions.length) {
            const region = regions[currentStep];
            const userProvinces = getSelectedProvinces(1);
            const correctProvinces = currentQuiz[region];

            let isCorrect = true;

            if (userProvinces.length !== correctProvinces.length) {
                isCorrect = false;
            } else {
                for (const userProvince of userProvinces) {
                    const foundMatch = correctProvinces.some(
                        (correctProvince) =>
                            correctProvince.toLowerCase() === userProvince.toLowerCase()
                    );

                    if (!foundMatch) {
                        isCorrect = false;
                        break;
                    }
                }
            }

            const feedback = document.getElementById("feedback1");
            if (isCorrect) {
                feedback.textContent = "Poprawnie!";
                feedback.className = "feedback correct";
                correctAnswers++;
            } else {
                feedback.textContent =
                    "Niepoprawnie! Poprawna odpowiedź: " +
                    correctProvinces.join(", ");
                feedback.className = "feedback incorrect";
            }

            const nextButton = document.getElementById("nextQuestionBtn");
            nextButton.style.display = "inline-block";
            nextButton.disabled = false;
            document.getElementById("nextQuestionBtn").addEventListener("click", () => {
                document.getElementById("nextQuestionBtn").style.display = "none";
                currentStep++;
                updateProgress();
                showCurrentQuestion();
            });


        }
    }

    function showResults() {
        const popup = document.getElementById("resultPopup");
        const title = document.getElementById("resultTitle");
        const score = document.getElementById("resultScore");

        popup.style.display = "flex";

        if (correctAnswers === totalSteps) {
            title.textContent = "Gratulacje!";
        } else if (correctAnswers >= Math.floor(totalSteps / 2)) {
            title.textContent = "Dobra robota!";
        } else {
            title.textContent = "Spróbuj ponownie!";
        }

        score.textContent = `${correctAnswers}/${totalSteps} poprawnych odpowiedzi`;
    }

    function switchMode(mode) {
        if (mode === currentMode) return;

        currentMode = mode;

        document
            .getElementById("textMode")
            .classList.toggle("active", mode === "text");
        document
            .getElementById("selectMode")
            .classList.toggle("active", mode === "select");

        showCurrentQuestion();
    }

    generateQuiz();

    document
        .getElementById("checkAnswers")
        .addEventListener("click", function (event) {
            act = 1;
            checkAnswers();
        }
        );
    var act = 0;
    document
        .addEventListener("keydown", function (event) {
            if (event.key === "Enter" && act == 0) {
                act = 1;
                checkAnswers();
            }
            else if (event.key === "Enter" && act == 1) {
                act = 0;
                updateProgress();
                document.getElementById("nextQuestionBtn").style.display = "none";
                currentStep++;
                showCurrentQuestion();
            }
        });
    document
        .getElementById("newQuiz")
        .addEventListener("click", generateQuiz);
    document
        .getElementById("textMode")
        .addEventListener("click", () => switchMode("text"));
    document
        .getElementById("selectMode")
        .addEventListener("click", () => switchMode("select"));
    document
        .getElementById("continueBtn")
        .addEventListener("click", () => {
            document.getElementById("resultPopup").style.display = "none";
            generateQuiz();
        });
});