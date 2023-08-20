
$(document).ready(function() {

// При клике на кастомный селект открываем/закрываем список опций
GlobalCheckVariable = 0;
Main_chos = "";

var selectedOptionValue = "";
var valueComp = "";
var SizeMonitor = "";
var MemoryStorageValue = "";
var SSDstorage = "";
var HddStorage = "";
var valueProcessor = "";









  // Слушаем клики на кнопках
$(".up_But").click(function() {
  // Если кнопка уже имеет класс active и ее id не равен "showFormButton", ничего не делаем
  if ($(this).hasClass("active") && this.id !== "showFormButton") {
    return;
  }

  // Удаляем класс active у всех кнопок в .button-container
  $(".button-container .up_But").removeClass("active");

  // Добавляем класс active только для текущей кнопки
  $(this).addClass("active");

  // Если текущая кнопка имеет id="showFormButton", показываем форму, иначе скрываем ее
  if (this.id === "showFormButton") {
    $("#formContainer").show();
  } else {
    $("#formContainer").hide();
  }
});



  // При клике на кастомный селект открываем/закрываем список опций
  $(document).on("click", ".custom-select", function(e) {
    $(".custom-select.active").not(this).removeClass("active");
    $(this).toggleClass("active"); // При клике на кастомный селект, добавляем/удаляем класс "active"
    e.stopPropagation(); // Останавливаем всплытие события, чтобы не сработало событие клика на документе
  });

  // Обработчик клика на опцию списка
  $(document).on("click",  ".options li", function(e) {
    var value = $(this).data("value"); // Получаем значение из атрибута data-value выбранного элемента
    var text = $(this).text(); // Получаем текст выбранного элемента
    var customSelect = $(this).closest(".custom-select");

    customSelect.find(".selected-option").text(text).data("value", value); // Устанавливаем выбранное значение и текст в кастомный селект
    customSelect.removeClass("active"); // Закрываем выпадающий список
    e.stopPropagation(); // Останавливаем всплытие события, чтобы не сработало событие клика на документе

    // Ваш код обработки выбранного значения, например, обновление других элементов страницы и т.д.
    console.log("Выбранное значение: ", value);
    if(Main_chos !== "" && Main_chos == "tech_org"){
      Techblock(value);
      handleStorageTypeChange(value);
      handleProcessorTypeChange(value);



    }else if ( Main_chos !== "" && Main_chos == "add_rights" ){

    }
  });






function Techblock(selectedStorageType) {
  var optionFieldsContainer = document.getElementById("optionFields");

  switch (selectedStorageType){
    case "org":
      optionFieldsContainer.innerHTML = "";
      optionFieldsContainer.innerHTML += `
                  <div id="computerTypeContainer">
                    <label for="computerType">Выберите тип компьютера:</label>

                    <div class="custom-select" tabindex="0">
                        <div class="selected-option" id="computerType" name="computerType" data-value="">Выберите...</div>
                        <div class="arrow"></div>
                        <ul class="options">
                            <li data-value="desktop">Стационарный компьютер</li>
                            <li data-value="laptop">Ноутбук</li>
                        </ul>
                        <select id="computerType_select" name="computerType" style="display:none;"></select>
                    </div>
                </div>
                <div id="monitorSizeContainer">
                    <label for="monitorSize">Выберите размер монитора:</label>
                    <div class="custom-select" tabindex="0">
                        <div class="selected-option" id="monitorSize" name="monitorSize" data-value="">Выберите...</div>
                        <div class="arrow"></div>
                        <ul class="options">
                            <li data-value="19">19 дюймов</li>
                            <li data-value="21">21 дюйм</li>
                            <li data-value="24">24 дюйма</li>
                            <li data-value="27">27 дюйма</li>
                        </ul>
                         <select id="monitorSize_select" name="monitorSize" style="display:none;"></select>
                    </div>      
                </div>
                 <div id="storageTypeContainer">
                    <label for="storageType">Выберите тип накопителя:</label>
                    <div class="custom-select" tabindex="0">
                        <div class="selected-option" id="storageType" name="storageType"  data-value="">Выберите...</div>
                        <div class="arrow"></div>
                        <ul class="options">
                            <li data-value="ssd">SSD</li>
                            <li data-value="hdd">HDD</li>
                            <li data-value="ssd_hdd">SSD и HDD</li>
                        </ul>
                         <select id="storageType_select" name="storageType" style="display:none;"></select>
                    </div>
                 </div>
                <div id="memoryFieldContainer"></div>
                <div id="processorTypeContainer">
                    <label for="processorType">Выберите тип процессора:</label>
                    
                    
                     <div class="custom-select" tabindex="0">
                        <div class="selected-option" id="processorType" name="processorType"  data-value="">Выберите...</div>
                        <div class="arrow"></div>
                        <ul class="options">
                            <li data-value="intel_i3">Intel core i3</li>
                            <li data-value="intel_i5">Intel core i5</li>
                            <li data-value="intel_i7">Intel core i7</li>
                            <li data-value="intel_i9">Intel core i9</li>
                            <li data-value="amd_ryzen_3">AMD Ryzen 3</li>
                            <li data-value="amd_ryzen_5">AMD Ryzen 5</li>
                            <li data-value="amd_ryzen_7">AMD Ryzen 7</li>
                            <li data-value="amd_ryzen_9">AMD Ryzen 9</li>
                        </ul>
                         <select id="processorType_select" name="processorType" style="display:none;"></select>
                    </div>
                    
                    
                    
                    <div id="processorNoteContainer"></div>
                </div>
                <div class="input-container" id="graphicsCardContainer">
                    <label for="graphicsCard">Введите модель видеокарты:</label>
                    <input type="text" id="graphicsCard" name="graphicsCard">
                    <span class="input-icon">&#9998;</span>
                </div>
                
                <div class="checkbox-container id="upsCheckbox">
                <!-- begin toggle markup\t -->
                <label class="toggle" for="upsCheckboxInput">
                    <input type="checkbox" class="toggle__input" id="upsCheckboxInput" name="upsNeeded" value="true"/>
                    <span class="toggle-track">
                        <span class="toggle-indicator">
                        <!-- \tThis check mark is optional\t -->
                            <span class="checkMark">
                                <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                </svg>
                            </span>
                        </span>
                    </span>
                    Источник бесперебойного питания (ИБП)
                </label>
                </div>
               `;
                break;
    case "mouse_keyboard":
      optionFieldsContainer.innerHTML = "";
      optionFieldsContainer.innerHTML += `
        <div id="keyboardContainerandMouseContainer">
          <div id="keyboardContainer">
            <label for="keyboard">Введите модель клавиатуры:</label>
            <input type="text" id="keyboard" name="keyboard">
              <span class="input-icon"  >&#9998;</span>
          </div>
          <div id="mouseContainer">
            <label for="mouse">Введите модель мыши:</label>
            <input type="text" id="mouse" name="mouse">
              <span class="input-icon">&#9998;</span>
          </div>
        </div>
      `;
      break;
    case "second_org":
       optionFieldsContainer.innerHTML = "";
       optionFieldsContainer.innerHTML += `
    <div id="checks_cont">
        <div class="checkbox-container id="upsCheckbox">
                  <!-- begin toggle markup	 -->
                  <label class="toggle" for="upsCheckboxInput">
                      <input type="checkbox" class="toggle__input" id="upsCheckboxInput" name="upsNeeded" value="true"/>
                      <span class="toggle-track">
                          <span class="toggle-indicator">
                          <!-- 	This check mark is optional	 -->
                              <span class="checkMark">
                                  <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                  <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                  </svg>
                              </span>
                          </span>
                      </span>
                      Источник бесперебойного питания (ИБП)
                  </label>
                  </div>
                  
        <div class="checkbox-container id="MFU_cont">
                  <!-- begin toggle markup	 -->
                  <label class="toggle" for="MFUInput">
                      <input type="checkbox" class="toggle__input" id="MFUInput" name="MFU_cont" value="true"/>
                      <span class="toggle-track">
                          <span class="toggle-indicator">
                          <!-- 	This check mark is optional	 -->
                              <span class="checkMark">
                                  <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                  <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                  </svg>
                              </span>
                          </span>
                      </span>
                      Мфу
                  </label>
         </div>                   
       </div>
                  <div id= "mfu_opt"></div>      
         `;
        $("#MFUInput").change(function() {
          var isChecked = $(this).prop("checked");
          var codeContainer = $("#mfu_opt");

          if (isChecked) {
           var htmlCode = `
            <div id="cheks_opt_mfu">
            <div class="checkbox-container id="paper_format_cont">
                  <!-- begin toggle markup	 -->
                  <label class="toggle" for="paper_format">
                      <input type="checkbox" class="toggle__input" id="paper_format" name="paper_format_cont" value="true"/>
                      <span class="toggle-track">
                          <span class="toggle-indicator">
                          <!-- 	This check mark is optional	 -->
                              <span class="checkMark">
                                  <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                  <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                  </svg>
                              </span>
                          </span>
                      </span>
                      Формат бумаги А3 (по умолч. А4)
                  </label>
             </div>  
             
             <div class="checkbox-container id="type_mfu_cont">
                  <!-- begin toggle markup	 -->
                  <label class="toggle" for="type_mfu">
                      <input type="checkbox" class="toggle__input" id="type_mfu" name="type_mfu_cont" value="true"/>
                      <span class="toggle-track">
                          <span class="toggle-indicator">
                          <!-- 	This check mark is optional	 -->
                              <span class="checkMark">
                                  <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                  <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                  </svg>
                              </span>
                          </span>
                      </span>
                      Струйный тип Мфу (по умолч. лазерный)
                  </label>
             </div>  
             
             <div class="checkbox-container id="color_mfu_cont">
                  <!-- begin toggle markup	 -->
                  <label class="toggle" for="color_mfu">
                      <input type="checkbox" class="toggle__input" id="color_mfu" name="color_mfu_cont" value="true"/>
                      <span class="toggle-track">
                          <span class="toggle-indicator">
                          <!-- 	This check mark is optional	 -->
                              <span class="checkMark">
                                  <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                  <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                  </svg>
                              </span>
                          </span>
                      </span>
                      Черно-белый Мфу (по умолч. цветной)
                  </label>
             </div>  
             <div class="checkbox-container id="mfu_network_cont">
                  <!-- begin toggle markup	 -->
                  <label class="toggle" for="mfu_network">
                      <input type="checkbox" class="toggle__input" id="mfu_network" name="mfu_network_cont" value="true"/>
                      <span class="toggle-track">
                          <span class="toggle-indicator">
                          <!-- 	This check mark is optional	 -->
                              <span class="checkMark">
                                  <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                  <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                  </svg>
                              </span>
                          </span>
                      </span>
                      Сеть для Мфу
                  </label>
             </div> 
         </div>
            <div id= "select_and_text">
               <div id = "mfu_developers_cont">
               <label for="mfu_developers">Производитель:</label>
               <div class="custom-select" tabindex="0">
                          <div class="selected-option" id="mfu_developers" name="mfu_developers"  data-value="">Выберите...</div>
                          <div class="arrow"></div>
                          <ul class="options">
                              <li data-value="Kyosera">Kyosera</li>
                              <li data-value="HP">HP</li>
                              <li data-value="Canon">Canon</li>
                              <li data-value="another">Другое</li>
                          </ul>
                           <select id="mfu_developers_select" name="mfu_developers" style="display:none;"></select>
                      </div>
                      
               </div>
             
               <div id="model_mfu_cont">
                  <label for="model_of_mfu">Введите модель:</label>
                  <input type="text" id="model_of_mfu" name="model_of_mfu">
                  <span class="input-icon"  >&#9998;</span>
              </div>
            </div>
             <div id="mfu_another_devel_cont">
                
            </div>
          `;

            codeContainer.html(htmlCode);

            $("#mfu_developers").change(function() {
              var selectedValue = $(this).val();
              console.log("mfu_developers обработчик в деле");
              mfu_another_devel_cont.innerHTML ="";
              if (selectedValue === "another") {
                 mfu_another_devel_cont.innerHTML +=`
                    <label htmlFor="model_of_mfu">Введите Производителя:</label>
                    <input type="text" id="another_mfu_devel" name="another_mfu_devel">
                    <span className="input-icon">&#9998;</span>
                  `;

              }else{
                 mfu_another_devel_cont.innerHTML ="";
              }
            });
          } else {
            codeContainer.empty();
          }
        });

        break;
    default:

  }




}






function handleStorageTypeChange(selectedStorageType) {

  var memoryFieldContainer = document.getElementById("memoryFieldContainer");


  if (selectedStorageType === "ssd") {
    memoryFieldContainer.style.display = "flex";
    console.log("int storage func value : ", selectedStorageType);
    memoryFieldContainer.innerHTML = ""; // Очищаем содержимое поля выбора памяти
    memoryFieldContainer.innerHTML += `
      <div id="ssdMemorySizeContainer">
        <label for="ssdmemorySize">Выберите размер памяти SSD:</label>
        
        <div class="custom-select" tabindex="0">
                        <div class="selected-option" id="ssdmemorySize" name="ssdmemorySize"  data-value="">Выберите...</div>
                        <div class="arrow"></div>
                        <ul class="options">
                            <li data-value="128gb_ssd">128 ГБ</li>
                            <li data-value="256gb_ssd">256 ГБ</li>
                            <li data-value="512gb_ssd">512 ГБ</li>
                            <li data-value="1024gb_ssd">1024 ГБ</li>
                            <li data-value="2048gb_ssd">2048 ГБ</li>
                        </ul>
                         <select id="ssdmemorySize_select" name="ssdmemorySize" style="display:none;"></select>
                    </div>
        
      </div>
    `;
  } else if (selectedStorageType === "hdd") {
    memoryFieldContainer.style.display = "flex";
    console.log("int storage func value : ", selectedStorageType);
    memoryFieldContainer.innerHTML = ""; // Очищаем содержимое поля выбора памяти
    memoryFieldContainer.innerHTML += `
      <div id="hddMemorySizeContainer">
        <label for="hhdmemorySize">Выберите размер памяти HDD :</label>
        
         <div class="custom-select" tabindex="0">
                        <div class="selected-option" id="hhdmemorySize" name="hddmemorySize"  data-value="">Выберите...</div>
                        <div class="arrow"></div>
                        <ul class="options">
                            <li data-value="512gb_hhd">512 ГБ</li>
                            <li data-value="256gb_hhd">256 ГБ</li>
                            <li data-value="1024gb_hhd">1 ТБ</li>
                            <li data-value="2048gb_hhd">2 ТБ</li>
                            <li data-value="4096gb_hhd">4 ТБ</li>
                        </ul>
                         <select id="hhdmemorySize_select" name="hddmemorySize" style="display:none;"></select>
                    </div>
        
      </div>
    `;
  } else if (selectedStorageType === "ssd_hdd") {
    memoryFieldContainer.style.display = "flex";
    console.log("int storage func value : ", selectedStorageType);
    memoryFieldContainer.innerHTML = ""; // Очищаем содержимое поля выбора памяти
    memoryFieldContainer.innerHTML += `
      <div id="ssdMemorySizeContainer">
        <label for="ssdMemorySize">Выберите размер памяти SSD:</label>
        <div class="custom-select" tabindex="0">
                        <div class="selected-option" id="ssdmemorySize" name="ssdmemorySize"  data-value="">Выберите...</div>
                        <div class="arrow"></div>
                        <ul class="options">
                            <li data-value="128gb_ssd">128 ГБ</li>
                            <li data-value="256gb_ssd">256 ГБ</li>
                            <li data-value="512gb_ssd">512 ГБ</li>
                            <li data-value="1024gb_ssd">1024 ГБ</li>
                            <li data-value="2048gb_ssd">2048 ГБ</li>
                        </ul>
                         <select id="ssdmemorySize_select" name="ssdmemorySize" style="display:none;"></select>
                    </div>
      </div>
      <div id="hddMemorySizeContainer">
        <label for="hddMemorySize">Выберите размер памяти HDD:</label>
        <div class="custom-select" tabindex="0">
                        <div class="selected-option" id="hhdmemorySize" name="hddmemorySize"  data-value="">Выберите...</div>
                        <div class="arrow"></div>
                        <ul class="options">
                            <li data-value="256gb_hhd">256 ГБ</li>
                            <li data-value="512gb_hhd">512 ГБ</li>
                            <li data-value="1024gb_hhd">1 ТБ</li>
                            <li data-value="2048gb_hhd">2 ТБ</li>
                            <li data-value="4096gb_hhd">4 ТБ</li>
                        </ul>
                         <select id="hhdmemorySize_select" name="hddmemorySize" style="display:none;"></select>
                    </div>
        </div>
    `;
  }
}

function handleProcessorTypeChange(selectedProcessorType) {

  var processorNoteContainer = document.getElementById("processorNoteContainer");

  if (selectedProcessorType == "intel_i3" ||  selectedProcessorType == "intel_i5" || selectedProcessorType == "intel_i7" || selectedProcessorType == "intel_i9"
  || selectedProcessorType == "amd_ryzen_3" || selectedProcessorType == "amd_ryzen_5" || selectedProcessorType == "amd_ryzen_7" || selectedProcessorType == "amd_ryzen_9") {
    console.log("in processor  func value : ", selectedProcessorType);
    processorNoteContainer.innerHTML = "";
    processorNoteContainer.innerHTML = `
      <label for="processorNote">Модель:</label>
      <input type="text" id="processorNote" name="processorNote">
      <span class="input-icon">&#9998;</span>
    `;
  } else {

  }
}








 $(" .options li").on("click", function() {
  var value = $(this).data("value"); // Получаем значение из атрибута data-value выбранного элемента
  var requestTextContainer = document.getElementById("requestTextContainer");
  var optionFieldsContainer = document.getElementById("optionFields");
  var softwareTypeContainer1 = document.getElementById("softwareTypeContainer1"); // Уникальный идентификатор
  var softwareTypeContainer2 = document.getElementById("softwareTypeContainer2"); // Уникальный идентификатор
  var MainFieldOpt = document.getElementById("MainFieldOpt");
  if (value !== "") {
    Main_chos = value;
    optionFieldsContainer.innerHTML = ""; // Очищаем содержимое перед добавлением нового
    optionFieldsContainer.style.display = "block";
    requestTextContainer.classList.remove("hidden");

    switch (value) {

          case 'tech_org':
            MainFieldOpt.innerHTML = "";
            MainFieldOpt.innerHTML += `
                 <div id="TechTypeContainer">
                    <label for="TechType">Выберите тип техники:</label>

                    <div class="custom-select" tabindex="0">
                        <div class="selected-option" id="TechType" name="TechType" data-value="">Выберите...</div>
                        <div class="arrow"></div>
                        <ul class="options">
                            <li data-value="org">Компьютер</li>
                            <li data-value="second_org">Доп техника</li>
                            <li data-value="mouse_keyboard">Клавиатура/мышь</li>
                        </ul>
                        <select id="TechType_select" name="TechType" style="display:none;"></select>
                    </div>
                </div>
            `;


            break;
          case 'new_org' :
            MainFieldOpt.innerHTML = "";
            optionFieldsContainer.innerHTML += "";
            optionFieldsContainer.innerHTML += `
              <div id="FIO_Cont">                  
                     <label for="keyboard">Введите Фио:</label>
                     <input type="text" id="fio" name="fio">
                     <span class="input-icon">&#9998;</span>
               </div>
               <div id="Position_work_container">                  
                     <label for="position_work">Введите Должность:</label>
                     <input type="text" id="position_work" name="position_work">
                     <span class="input-icon">&#9998;</span>
               </div>
               <label for="department">Отдел:</label>
               <div class="custom-select" tabindex="0">
                        <div class="selected-option" id="department" name="department"  data-value="">Выберите...</div>
                        <div class="arrow"></div>
                        <ul class="options">
                            <li data-value="IT_department">IT отдел</li>
                            <li data-value="HR_department">HR отдел</li>
                            <li data-value="PR_department">PR отдел</li>                         
                        </ul>
                         <select id="department_select" name="department" style="display:none;"></select>
                    </div>
               </div>
            `;
            break;
          case 'add_rights' :
            MainFieldOpt.innerHTML = "";
            optionFieldsContainer.innerHTML += "";
            optionFieldsContainer.innerHTML += `
                <div id="softwareTypeContainer1">
                    <label for="softwareType">Выберите ресурс:</label>
                    <select id="softwareType" name="softwareType">
                        <option value="" selected>Выберите...</option>
                        <option value="One_C">1С</option>
                        <option value="bitrix">Битрикс</option>
                        <option value="app">Прикладное ПО</option>
                        <option value="file_storage">Файловое хранилище</option>
                    </select>
                </div>
                <div id = "softwareTypeContainer2"></div>
            `;

            document.getElementById("optionFields").addEventListener("change", function(event) {
                var softwareValue = event.target.value;
                var softwareTypeContainer = document.getElementById("softwareTypeContainer2");

                //softwareTypeContainer.innerHTML = ""; // Очищаем содержимое контейнера перед добавлением новых полей
                console.log("one_c met");
                if (softwareValue === "One_C") {
                  MainFieldOpt.innerHTML = "";
                  optionFieldsContainer.innerHTML += "";
                  softwareTypeContainer.innerHTML = "";
                  softwareTypeContainer.innerHTML += `
                    <div id="databaseContainer">
                        <label for="database">База данных:</label>
                        <input type="text" id="database" name="database">
                    </div>
                    <div id="permissionsContainer">
                        <label for="permissions" style="text-decoration: underline; font-weight: bold; text-align: center;">Права:</label>
                        <label for="addPermissions">Добавить</label>
                        <input type="checkbox" id="addPermissions" name="permissions_add" value="add">
                        <label for="deletePermissions">Удалить</label>
                        <input type="checkbox" id="deletePermissions" name="permissions" value="delete">
                    </div>
                    `;
                  console.log("One_C condition met");

                } else if (softwareValue === "bitrix") {
                  MainFieldOpt.innerHTML = "";
                  console.log("bitrix condition met");
                  softwareTypeContainer.innerHTML = "";
                  softwareTypeContainer.innerHTML += `
                     <div id="permissionsContainer">
                        <label for="permissions" style="text-decoration: underline; font-weight: bold; text-align: center;">Права:</label>
                        <label for="addPermissions">Добавить</label>
                        <input type="checkbox" id="addPermissions" name="permissions" value="add">
                        <label for="deletePermissions">Удалить</label>
                        <input type="checkbox" id="deletePermissions" name="permissions" value="delete">
                     </div>
                     <label for="processorNote">Имя пользователя:</label>
                     <input type="text" id="name_user_for_bitrix" name="name_user_for_bitrix">
                     `;


                } else if (softwareValue === "app") {
                  MainFieldOpt.innerHTML = "";
                  console.log("app condition met");
                  softwareTypeContainer.innerHTML = "";
                  softwareTypeContainer.innerHTML += `
                    <div id="permissionsContainer">
                      <label for="permissions" style="text-decoration: underline; font-weight: bold; text-align: center;">Права:</label>
                      <label for="addPermissions">Добавить</label>
                      <input type="checkbox" id="addPermissions" name="permissions" value="add">
                      <label for="deletePermissions">Удалить</label>
                      <input type="checkbox" id="deletePermissions" name="permissions" value="delete">
                    </div>
                    <div id="softFileCont">
                      <label for="softType">Выберите программное обеспечение:</label>
                      <select id="softType" name="softType">
                       <option value="" selected>Выберите...</option>
                       <option value="auto_cad">AutoCAD</option>
                       </select>
                    </div>
                  `;

                }else if (softwareValue === "file_storage"){
                  console.log("file_storage condition met");
                  softwareTypeContainer.innerHTML = "";
                  softwareTypeContainer.innerHTML += `
                    
                    <div id="folderSelectContainer">
                        <button id="selectFolderBtn" type = "button">Сформировать папки</button>
                        <label for="UsersSelect">Список пользователей:</label>
                        <select id="UsersSelect"></select>
                        <label for="folderSelect">Список папок:</label>
                        <select id="folderSelect"></select>                    
                    </div>
                    
                    <div id = "labelpermcont">
                        <label for="permissions" style=" font-weight: bold; text-align: center;">Права:</label>
                    </div>
                    
                    
                    <div id="permissionsContainer">   <!--  Контейнер галочек-прав -->
                    
                     <!--  Чтение) -->
                      <div class="checkbox-container id="CheckboxReadPerm">
                        <label class="toggle" for="CheckboxforReadPerm">
                            <input type="checkbox" class="toggle__input" id="CheckboxforReadPerm" name="ReadPermCheck" value="true"/>
                            <span class="toggle-track">
                                <span class="toggle-indicator">
                                <!-- \tThis check mark is optional\t -->
                                    <span class="checkMark">
                                        <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                        <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                        </svg>
                                    </span>
                                </span>
                            </span>
                            Чтение (read)
                        </label>
                     </div>
                                
                       <!--  Запись -->
                      <div class="checkbox-container id="CheckboxWritePerm">
                        <label class="toggle" for="CheckboxforWritePerm">
                            <input type="checkbox" class="toggle__input" id="CheckboxforWritePerm" name="WritePermCheck" value="true"/>
                            <span class="toggle-track">
                                <span class="toggle-indicator">
                                <!-- \tThis check mark is optional\t -->
                                    <span class="checkMark">
                                        <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                        <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                        </svg>
                                    </span>
                                </span>
                            </span>
                            Запись (write)
                        </label>
                      </div>
                
                <!--  Выполнение (execute) -->
                      <div class="checkbox-container id="CheckboxExecPerm">
                        <label class="toggle" for="CheckboxforExecPerm">
                            <input type="checkbox" class="toggle__input" id="CheckboxforExecPerm" name="ExecPermCheck" value="true"/>
                            <span class="toggle-track">
                                <span class="toggle-indicator">
                                <!-- \tThis check mark is optional\t -->
                                    <span class="checkMark">
                                        <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                        <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                        </svg>
                                    </span>
                                </span>
                            </span>
                            Выполнение (execute)
                        </label>
                      </div>
                
                <!-- создание папки -->
                      <div class="checkbox-container id="CheckboxCreatePerm">               
                        <label class="toggle" for="CheckboxforCreatePerm">
                            <input type="checkbox" class="toggle__input" id="CheckboxforCreatePerm" name="CreatePermCheck" value="true"/>
                            <span class="toggle-track">
                                <span class="toggle-indicator">
                                <!-- \tThis check mark is optional\t -->
                                    <span class="checkMark">
                                        <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                        <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                        </svg>
                                    </span>
                                </span>
                            </span>
                            Создание файла (create)
                        </label>
                      </div>

                <!-- Удаление папки 
                      <div class="checkbox-container id="CheckboxDelPerm">
                        <label class="toggle" for="CheckboxforDelPerm">
                            <input type="checkbox" class="toggle__input" id="CheckboxforDelPerm" name="DelPermCheck" value="true"/>
                            <span class="toggle-track">
                                <span class="toggle-indicator">
                                
                                    <span class="checkMark">
                                        <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                        <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                        </svg>
                                    </span>
                                </span>
                            </span>
                            Удаление (delete)
                        </label>
                      </div>
                -->
                 <!-- Удаление поддиректорий 
                      <div class="checkbox-container id="CheckboxDelSubPerm">
                        <label class="toggle" for="CheckboxforDelSubPerm">
                            <input type="checkbox" class="toggle__input" id="CheckboxforDelSubPerm" name="DelSubPermCheck" value="true"/>
                            <span class="toggle-track">
                                <span class="toggle-indicator">
                                
                                    <span class="checkMark">
                                        <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                        <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                        </svg>
                                    </span>
                                </span>
                            </span>
                            Удаление поддиректорий (delete subdirectories)
                        </label>
                      </div>
                     -->          
                <!-- Добавление прав доступа 
                      <div class="checkbox-container id="CheckboxAddAclPerm">
                        <label class="toggle" for="CheckboxforAddAclPerm">
                            <input type="checkbox" class="toggle__input" id="CheckboxforAddAclPerm" name="AddAclPermCheck" value="true"/>
                            <span class="toggle-track">
                                <span class="toggle-indicator">
                                
                                    <span class="checkMark">
                                        <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                        <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                        </svg>
                                    </span>
                                </span>
                            </span>
                            Добавление прав доступа (add ACL)
                        </label>
                      </div>
                -->
                <!-- Удаление прав доступа 
                      <div class="checkbox-container id="CheckboxDelAclPerm">
                        <label class="toggle" for="CheckboxforDelAclPerm">
                            <input type="checkbox" class="toggle__input" id="CheckboxforDelAclPerm" name="DelAclPermCheck" value="true"/>
                            <span class="toggle-track">
                                <span class="toggle-indicator">
                          
                                    <span class="checkMark">
                                        <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                        <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                        </svg>
                                    </span>
                                </span>
                            </span>
                            Удаление прав доступа (delete ACL)
                        </label>
                      </div>
                -->
                <!-- Чтение прав доступа (read ACL) 
                      <div class="checkbox-container id="CheckboxWriteAclPerm">
                        <label class="toggle" for="CheckboxforWriteAclPerm">
                            <input type="checkbox" class="toggle__input" id="CheckboxforWriteAclPerm" name="WriteAclPermCheck" value="true"/>
                            <span class="toggle-track">
                                <span class="toggle-indicator">
                                
                                    <span class="checkMark">
                                        <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                        <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                        </svg>
                                    </span>
                                </span>
                            </span>
                            Чтение прав доступа (read ACL)
                        </label>
                      </div>
                -->
                <!-- Редактирование прав доступа 
                      <div class="checkbox-container id="CheckboxChangeAclPerm">
                        <label class="toggle" for="CheckboxforChangeAclPerm">
                            <input type="checkbox" class="toggle__input" id="CheckboxforChangeAclPerm" name="ChangeAclPermCheck" value="true"/>
                            <span class="toggle-track">
                                <span class="toggle-indicator">
                               
                                    <span class="checkMark">
                                        <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                        <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                        </svg>
                                    </span>
                                </span>
                            </span>
                            Редактирование прав доступа (change ACL)
                        </label>
                      </div>
                -->
                 <!-- Обход (traverse) для директории 
                      <div class="checkbox-container id="CheckboxTraversePerm">
                        <label class="toggle" for="CheckboxforTraversePerm">
                            <input type="checkbox" class="toggle__input" id="CheckboxforTraversePerm" name="TraversePermCheck" value="true"/>
                            <span class="toggle-track">
                                <span class="toggle-indicator">
                               
                                    <span class="checkMark">
                                        <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                        <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                                        </svg>
                                    </span>
                                </span>
                            </span>
                            Обход (traverse) для директории
                        </label>
                      </div>
                    </div>
                    -->
                   `;



                  $("#selectFolderBtn").on("click", function(event) {   //обработчик js кот формирует папки user и folder
                    event.stopPropagation();
                    selectedOptionValue = Main_chos;
                    $("#customSelectOption_main_select").val(Main_chos);

                    // Отображаем сообщение "button clicked" в консоли
                    console.log("button clicked сформировать кнопки");



                    var variant = "syn_us_fold";


                    // Выполняем AJAX-запрос к вашему API для получения списка папок
                    var xhr1 = new XMLHttpRequest();
                    xhr1.open("POST", "/api/");
                    xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                    var csrftoken = getCookie('csrfmiddlewaretoken');
                      console.log("csrfToken is : ",csrftoken);
                    xhr1.setRequestHeader("X-CSRFToken", csrftoken);
                    xhr1.onreadystatechange = function() {
                      console.log("ReadyState: " + xhr1.readyState);
                      console.log("Status: " + xhr1.status);
                      if (xhr1.readyState === XMLHttpRequest.DONE) {
                        if (xhr1.status === 200) {
                          var response = JSON.parse(xhr1.responseText);
                          if (response.success) {
                            console.log("I succeeded");
                            // Отобразить полученный список папок в поле <select>
                            populateFolderSelect(response.folders);
                            populateUserSelect(response.users);
                          } else {
                            console.log("I failed");
                            console.error(response.message);
                            // Обработка ошибки
                          }
                        } else {
                          console.error(xhr1.status);
                          // Обработка ошибки
                        }
                        console.log("Response:", JSON.parse(xhr1.responseText)); // Отображение ответа сервера

                      }
                    };
                    xhr1.send("customSelectOption_main_select=" + encodeURIComponent(variant)); // Передача значения variant в запросе
                    //xhr1.send(); // Отправка AJAX-запроса
                  });

                  // Функция для заполнения поля <select> списком папок
                  function populateFolderSelect(folders) {
                    var folderSelect = $("#folderSelect");

                    // Очистить предыдущий список опций
                    folderSelect.empty();
                    folderSelect.append($('<option>', {
                      value: '',
                      text: 'Выберите папку...'
                    }));
                    // Добавить папки в список
                    folders.forEach(function(folder) {
                      folderSelect.append($('<option>', {
                        value: folder,
                        text: folder
                      }));
                    });
                  }

                  function populateUserSelect(users) {
                    var userSelect = $("#UsersSelect");

                    // Очистить предыдущий список опций
                    userSelect.empty();
                    // Добавить пустой элемент по умолчанию
                    userSelect.append($('<option>', {
                      value: '',
                      text: 'Выберите пользователя...'
                    }));

                    // Добавить пользователей в список
                    users.forEach(function(user) {
                      userSelect.append($('<option>', {
                        value: user,
                        text: user
                      }));
                    });
                  }
                  $("#UsersSelect, #folderSelect").change(function() {
                    var val_user = $("#UsersSelect").val();
                    var val_folder = $("#folderSelect").val();

                    if (val_user !== "" && val_folder !== "") {
                      console.log("Обработчик прав в работе");
                       var variant = "syn_perm";
                       // Выполняем AJAX-запрос к вашему API для получения списка папок
                        var xhr1 = new XMLHttpRequest();
                        xhr1.open("POST", "/api/");
                        xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                        var csrftoken = getCookie('csrfmiddlewaretoken');
                          console.log("csrfToken is : ",csrftoken);
                        xhr1.setRequestHeader("X-CSRFToken", csrftoken);


                        var dataToSend = {
                            'customSelectOption_main_select': variant,
                            'UsersSelect': val_user,
                            'folderSelect': val_folder
                        };
                          var formData = new URLSearchParams(dataToSend).toString();
                        xhr1.onreadystatechange = function() {
                          console.log("ReadyState: " + xhr1.readyState);
                          console.log("Status: " + xhr1.status);
                          if (xhr1.readyState === XMLHttpRequest.DONE) {
                            if (xhr1.status === 200) {
                              var response = JSON.parse(xhr1.responseText);
                              if (response.success) {
                                console.log("I succeeded");
                                // Отобразить полученный список папок в поле <select>
                                ShowPerm(response);

                              } else {
                                console.log("I failed");
                                console.error(response.message);
                                // Обработка ошибки
                              }
                            } else {
                              console.error(xhr1.status);
                              // Обработка ошибки
                            }
                            console.log("Response:", JSON.parse(xhr1.responseText)); // Отображение ответа сервера

                          }
                        };
                        xhr1.send(formData);
                        //xhr1.send(); // Отправка AJAX-запроса

                    }
                  });
                   function ShowPerm(perm) {
                       console.log("perm:", perm);
                       $("#CheckboxforReadPerm").prop("checked", false);
                       $("#CheckboxforWritePerm").prop("checked", false);
                       $("#CheckboxforCreatePerm").prop("checked", false);
                       $("#CheckboxforExecPerm").prop("checked", false);
                       var permissionsArray = perm.permission;
                       console.log("permissionsArray:", permissionsArray);
                       for (var i = 0; i < permissionsArray.length; i++) {
                          switch (permissionsArray[i]){
                            case 'r':
                              $("#CheckboxforReadPerm").prop("checked", true);
                              console.log("case r :", permissionsArray[i]);
                              break;
                            case 'w':
                              $("#CheckboxforWritePerm").prop("checked", true);
                              console.log("case w :", permissionsArray[i]);
                              break;
                            case 'x':
                              $("#CheckboxforExecPerm").prop("checked", true);
                              console.log("case x :", permissionsArray[i]);
                              break;
                            case 'p':
                              $("#CheckboxforCreatePerm").prop("checked", true);
                              console.log("case p :", permissionsArray[i]);
                              break;
                            case 'd':
                             // $("#CheckboxforDelPerm").prop("checked", true);
                              console.log("case d :", permissionsArray[i]);
                              break;
                            case 'D':
                              //$("#CheckboxforDelSubPerm").prop("checked", true);
                              console.log("case D :", permissionsArray[i]);
                              break;
                            case 'a':
                              //$("#CheckboxforAddAclPerm").prop("checked", true);
                              console.log("case a :", permissionsArray[i]);
                              break;
                            case 'A':
                              //$("#CheckboxforDelAclPerm").prop("checked", true);
                              console.log("case A :", permissionsArray[i]);
                              break;
                            case 'R':
                             //$("#CheckboxforWriteAclPerm").prop("checked", true);
                              console.log("case R :", permissionsArray[i]);
                              break;
                            case 'W':
                              //$("#CheckboxforChangeAclPerm").prop("checked", true);
                              console.log("case W :", permissionsArray[i]);
                              break;
                            case 'c':
                              //$("#CheckboxforTraversePerm").prop("checked", true);
                              console.log("case c :", permissionsArray[i]);
                              break;
                            default:
                              console.log("case '-' :");
                          }
                        }
                   }





                }
            });
          break;
      }
    } else {
      optionFieldsContainer.innerHTML = ""; // Очищаем содержимое перед добавлением нового
      optionFieldsContainer.style.display = "none";
      requestTextContainer.classList.add("hidden");
    }



    $("#optionFields").on("click", ".options li", function(e) {
      console.log("обработчик optionFields в деле");
      var valuePublic = $(this).data("value");
      if(valuePublic == "desktop" || valuePublic == "laptop" ){
        valueComp = valuePublic;
        $("#computerType_select").val(valueComp);
        console.log("Выбранное значение для compType: ", valueComp);
      }
      if(valuePublic == "19" || valuePublic == "21" || valuePublic == "24" || valuePublic == "27" ) {
        SizeMonitor = valuePublic;
        $("#computerType_select").val(SizeMonitor);
        console.log("Выбранное значение для SizeMonitor: ", SizeMonitor);
      }
      if(valuePublic == "ssd" || valuePublic == "hdd" || valuePublic == "ssd_hdd" ) {
        MemoryStorageValue = valuePublic;
        $("#computerType_select").val(MemoryStorageValue);
        console.log("Выбранное значение для MemoryStorageValue: ", MemoryStorageValue);
      }
      if(valuePublic == "512gb_hhd" || valuePublic == "256gb_hhd" || valuePublic == "1024gb_hhd"  || valuePublic == "2048gb_hhd"  || valuePublic == "4096gb_hhd" ) {
        HddStorage = valuePublic;
        $("#computerType_select").val(HddStorage);
        console.log("Выбранное значение для HddStorage: ", HddStorage);
      }
      if(valuePublic == "128gb_ssd" || valuePublic == "256gb_ssd" || valuePublic == "1024gb_ssd"  || valuePublic == "2048gb_ssd"  ) {
        SSDstorage = valuePublic;
        $("#computerType_select").val(SSDstorage);
        console.log("Выбранное значение для SSDstorage: ", SSDstorage);
      }
      if(valuePublic == "intel_i3" || valuePublic == "intel_i5" || valuePublic == "intel_i7"  || valuePublic == "intel_i9"
     || valuePublic == "amd_ryzen_3" || valuePublic == "amd_ryzen_5" || valuePublic == "amd_ryzen_7" || valuePublic == "amd_ryzen_9"  ) {
        valueProcessor = valuePublic;
        $("#computerType_select").val(valueProcessor);
        console.log("Выбранное значение для valueProcessor: ", valueProcessor);
      }


    });

  });











  $("#myForm").submit(function(event) {
    event.preventDefault(); // Предотвращаем отправку формы, чтобы не обновлялась страница
    var clickedElement = event.originalEvent.explicitOriginalTarget || document.activeElement;

  // Проверяем, является ли этот элемент кнопкой с типом "submit"
    if (clickedElement.type === 'submit') {
      var desiredDate = document.getElementById("desiredDate").value;
      var currentDate = new Date().toISOString();
      var upsCheckbox = document.getElementById("upsCheckboxInput");
      var upsNeeded = upsCheckbox ? upsCheckbox.checked.toString() : false;

      // Создаем скрытое поле для выбранной пользователем желаемой даты
      var desiredDateField = document.createElement("input");
      desiredDateField.type = "hidden";
      desiredDateField.name = "desiredDate";
      desiredDateField.value = desiredDate;

      // Создаем скрытое поле для текущей даты и времени
      var currentDateField = document.createElement("input");
      currentDateField.type = "hidden";
      currentDateField.name = "currentDate";
      currentDateField.value = currentDate;


      // Добавляем скрытые поля в форму
      var form = document.getElementById("myForm");
      form.appendChild(desiredDateField);
      form.appendChild(currentDateField);
      // Добавляем значение <select> в объект FormData


      selectedOptionValue = Main_chos;
      $("#customSelectOption_main_select").val(Main_chos);


      console.log(selectedOptionValue);
      // Добавляем значение upsNeeded в FormData
      var formData = new FormData(form);
      formData.append('upsNeeded', String(upsNeeded));
      formData.append('customSelectOption_main_select', selectedOptionValue);
      if (selectedOptionValue == "org") {
        console.log("if org in js submit");
        formData.append('computerType_select', valueComp);
        formData.append('monitorSize_select', SizeMonitor);
        formData.append('storageType_select', MemoryStorageValue);
        formData.append('ssdmemorySize_select', SSDstorage);
        formData.append('hhdmemorySize_select', HddStorage);
        formData.append('processorType_select', valueProcessor);


      }

      console.log("Функция submit для отправить активирована");
      var xhr2 = new XMLHttpRequest();
      xhr2.open("POST", "/api/");
      // Перемещаем строку с установкой заголовка после создания xhr
      var csrftoken = getCookie('csrfmiddlewaretoken');
      xhr2.setRequestHeader("X-CSRFToken", csrftoken);

      xhr2.onreadystatechange = function () {
        if (xhr2.readyState === XMLHttpRequest.DONE) {
          if (xhr2.status === 200) {
            console.log(xhr2.responseText);
            document.getElementById("requestText").value = ""; // Очистить поле с текстом заявки
          } else {
            console.error(xhr2.status);

          }
        }
      };
      xhr2.send(formData);
      alert("Форма отправлена!");

    }
  });






// Функция для получения значения CSRF-токена из куки
function getCookie() {
  var tokenElement = document.querySelector('input[name="csrfmiddlewaretoken"]');
  console.log("getCsrfToken is working:" +  tokenElement);
  if (tokenElement) {
    var csrfToken = tokenElement.value;
    return csrfToken;
  }
  return null;
}





});
