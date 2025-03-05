/**
 * Atualiza a posição do slider.
 * @param {HTMLElement} divContainer - O contêiner do slider.
 * @param {HTMLElement[]} sliders - A lista de elementos do slider.
 * @param {number} index - O índice atual do slider.
 */
function updateSliderPosition(divContainer, sliders, index) {
    const slideWidth = divContainer.clientWidth;
    sliders.forEach((slider) => {
      slider.style.transform = `translateX(-${index * slideWidth}px)`;
    });
  }
  
  /**
   * Inicializa o slider.
   * @param {HTMLElement} divContainer - O contêiner do slider.
   * @returns {Object} - Um objeto com funções para manipular o slider.
   */
  function createSlide(divContainer) {
    const back = document.getElementById("backButtonSlide");
    const next = document.getElementById("nextButtonSlide");
    if (!back || !next) {
      console.error("Botões de navegação do slider não encontrados.");
      return;
    }
  
    const sliders = Array.from(divContainer.querySelectorAll(".slider"));
    let indexSlide = 0; // Variável encapsulada dentro da função createSlide
  
    const update = () => updateSliderPosition(divContainer, sliders, indexSlide);
  
    next.addEventListener("click", () => {
      if (indexSlide < sliders.length - 1) {
        indexSlide++;
        update();
      }
    });
  
    back.addEventListener("click", () => {
      if (indexSlide > 0) {
        indexSlide--;
        update();
      }
    });
  
    window.addEventListener("resize", update);
  
    // Atualiza a posição inicial
    update();
  
    // Retorna métodos para controle externo do slider
    return {
      nextSlide: () => {
        if (indexSlide < sliders.length - 1) {
          indexSlide++;
          update();
        }
      },
      prevSlide: () => {
        if (indexSlide > 0) {
          indexSlide--;
          update();
        }
      },
      goToSlide: (index) => {
        if (index >= 0 && index < sliders.length) {
          indexSlide = index;
          update();
        }
      },
      getCurrentSlide: () => indexSlide,
    };
  }


  let containerMindMap = document.getElementById("mindMapContainer")
  var controllerSlider = createSlide(containerMindMap)

  let botaoVoltar = document.getElementById("")