document.addEventListener("DOMContentLoaded", function () {
    let act = 0;
    let totalSteps = parseInt(prompt("Liczba pytań: ")) || 5;
    if (isNaN(totalSteps) || totalSteps <= 0) {
        totalSteps = 5;
    }
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
        "Kotlina Sandomierska": ["podkarpackie", "świętokrzyskie", "małopolskie", "lubelskie"],
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
        "Rzeka Wisła": ["śląskie", "małopolskie", "świętokrzyskie", "mazowieckie", "kujawsko-pomorskie", "pomorskie"],
        "Rzeka Odra": ["śląskie", "opolskie", "dolnośląskie", "lubuskie", "zachodniopomorskie"],
        "Rzeka Warta": ["śląskie", "łódzkie", "wielkopolskie", "lubuskie", "zachodniopomorskie"],
        "Rzeka San": ["podkarpackie", "lubelskie"],
        "Rzeka Bug": ["lubelskie", "mazowieckie", "podlaskie"],
        "Rzeka Dunajec": ["małopolskie", "podkarpackie"],
    };

    const allProvinces = Array.from(new Set(Object.values(allRegions).flat())).sort();

    let currentQuiz = {};
    let currentMode = "text";
    let currentStep = 0;
    let correctAnswers = 0;

    function getRandomRegions(count) {
        const regions = Object.keys(allRegions);
        const selected = {};

        while (Object.keys(selected).length < Math.min(count, regions.length)) {
            const region = regions[Math.floor(Math.random() * regions.length)];
            selected[region] = allRegions[region];
        }

        return selected;
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
        container.className = "selectContainer";

        const selectedDisplay = document.createElement("div");
        selectedDisplay.className = "selectedProvinces";

        const select = document.createElement("select");
        const hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.id = "area" + index;

        const addButton = document.createElement("button");
        addButton.textContent = "Dodaj województwo";
        addButton.type = "button";

        const selectedProvinces = [];

        const defaultOption = new Option("Wybierz województwo", "", true);
        select.appendChild(defaultOption);

        allProvinces.forEach(province => {
            select.appendChild(new Option(province, province));
        });

        function updateSelectedDisplay() {
            selectedDisplay.innerHTML = "";
            if (selectedProvinces.length === 0) {
                selectedDisplay.textContent = "Brak wybranych województw";
                return;
            }
            selectedProvinces.forEach((province, i) => {
                const tag = document.createElement("span");
                tag.className = "provinceTag";
                tag.textContent = province;
                const remove = document.createElement("span");
                remove.className = "remove";
                remove.textContent = "×";
                remove.onclick = () => {
                    selectedProvinces.splice(i, 1);
                    updateSelectedDisplay();
                    hiddenInput.value = JSON.stringify(selectedProvinces);
                };
                tag.appendChild(remove);
                selectedDisplay.appendChild(tag);
            });
        }

        addButton.onclick = () => {
            const val = select.value;
            if (val && !selectedProvinces.includes(val)) {
                selectedProvinces.push(val);
                updateSelectedDisplay();
                hiddenInput.value = JSON.stringify(selectedProvinces);
                select.value = "";
            }
        };

        updateSelectedDisplay();
        hiddenInput.value = JSON.stringify(selectedProvinces);

        container.appendChild(selectedDisplay);
        container.appendChild(select);
        container.appendChild(addButton);
        container.appendChild(hiddenInput);

        return container;
    }

    function getSelectedProvinces(index) {
        const input = document.getElementById("area" + index);
        if (currentMode === "text") {
            return input.value.split(",").map(v => v.trim()).filter(v => v);
        }
        try {
            return JSON.parse(input.value);
        } catch {
            return [];
        }
    }

    function generateQuiz() {
        act = 0;
        currentQuiz = getRandomRegions(totalSteps);
        currentStep = 0;
        correctAnswers = 0;
        updateProgress();
        showCurrentQuestion();
    }

    function showCurrentQuestion() {
        const container = document.getElementById("questionContainer");
        container.innerHTML = "";
        const region = Object.keys(currentQuiz)[currentStep];

        const card = document.createElement("div");
        card.className = "questionCard";

        const title = document.createElement("div");
        title.className = "questionTitle";
        title.textContent = `Do jakiego województwa należy: ${region}?`;

        const inputContainer = document.createElement("div");
        inputContainer.appendChild(
            currentMode === "text" ? generateTextInput(1) : generateSelectSystem(1)
        );

        const feedback = document.createElement("div");
        feedback.className = "feedback";
        feedback.id = "feedback1";

        card.appendChild(title);
        card.appendChild(inputContainer);
        card.appendChild(feedback);

        container.appendChild(card);
    }

    function updateProgress() {
        const progressBar = document.getElementById("progress");
        const percentage = (currentStep / totalSteps) * 100;
        progressBar.style.width = `${percentage}%`;
    }

    function checkAnswers() {
        const region = Object.keys(currentQuiz)[currentStep];
        const user = getSelectedProvinces(1).map(v => v.toLowerCase());
        const correct = currentQuiz[region].map(v => v.toLowerCase());

        const isCorrect = user.length === correct.length &&
            user.every(val => correct.includes(val));

        const feedback = document.getElementById("feedback1");
        feedback.className = `feedback ${isCorrect ? "correct" : "incorrect"}`;
        feedback.textContent = isCorrect ? "Poprawnie!" : correct.join(", ");

        if (isCorrect) correctAnswers++;

        currentStep++;
        act = 1;
        document.getElementById("nextQuestionBtn").style.display = "block";
        document.getElementById("checkAnswers").style.display = "none";
    }

    function showResults() {
        const popup = document.getElementById("resultPopup");
        const title = document.getElementById("resultTitle");
        const score = document.getElementById("resultScore");

        popup.style.display = "flex";

        if (correctAnswers === totalSteps) title.textContent = "Gratulacje!";
        else if (correctAnswers >= Math.floor(totalSteps / 2)) title.textContent = "Dobra robota!";
        else title.textContent = "Spróbuj ponownie!";

        score.textContent = `${correctAnswers}/${totalSteps} poprawnych odpowiedzi`;
    }

    function switchMode(mode) {
        if (mode === currentMode) return;
        currentMode = mode;

        document.getElementById("textMode").classList.toggle("active", mode === "text");
        document.getElementById("selectMode").classList.toggle("active", mode === "select");

        showCurrentQuestion();
    }

    document.getElementById("checkAnswers").onclick = () => {
        if (act === 0) {
            checkAnswers();
            updateProgress();
        };
    };

    document.getElementById("nextQuestionBtn").onclick = () => {
        if (currentStep >= totalSteps) {
            showResults();
        } else {
            act = 0;
            updateProgress();
            document.getElementById("nextQuestionBtn").style.display = "none";
            document.getElementById("checkAnswers").style.display = "block";
            showCurrentQuestion();
        }
    };

    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            if (act === 0) {
                checkAnswers();
                updateProgress();
            } else if (act === 1) {
                if (currentStep >= totalSteps) {
                    updateProgress();
                    showResults();
                    act = 3;
                }
                else {
                    act = 0;
                    document.getElementById("nextQuestionBtn").style.display = "none";
                    document.getElementById("checkAnswers").style.display = "block";
                    showCurrentQuestion();
                }
            }
            else {
                document.getElementById("resultPopup").style.display = "none";
                generateQuiz();
            }
        }
    });

    document.getElementById("newQuiz").addEventListener("click", generateQuiz);
    document.getElementById("textMode").addEventListener("click", () => switchMode("text"));
    document.getElementById("selectMode").addEventListener("click", () => switchMode("select"));
    document.getElementById("continueBtn").addEventListener("click", () => {
        document.getElementById("resultPopup").style.display = "none";
        generateQuiz();
    });

    generateQuiz();
});
