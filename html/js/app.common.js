$(document).ready(function(){
	$("a.double-hover").live("mouseover", function() {
		$(this).parents(".double-hover-wrap:first").find("a[href='" + $(this).attr("href") + "']").addClass("pseudo-hover");
	});
	$("a.double-hover").live("mouseout", function() {
		$(this).parents(".double-hover-wrap:first").find("a[href='" + $(this).attr("href") + "']").removeClass("pseudo-hover");
	});
});


/*
* При полной загрузке документа
* мы начинаем определять события
*/
$(document).ready(function () {
	/*
	 * На выборе селекта страны — вешаем событие,
	 * функция будет брать значение этого селекта
	 * и с помощью ajax запроса получать список
	 * городов для вставки в следующий селект
	 */
	$('#country_id').change(function () {		
		/*
		 * В переменную country_id положим значение селекта
		 * (выбранная страна)
		 */
		var country_id = $(this).val();
		/*
		 * Если значение селекта равно 0,
		 * т.е. не выбрана страна, то мы
		 * не будем ничего делать
		 */
		if (country_id == '0') {
			$('#region_id').html('<option>- выберите город -</option>');
			$('#region_id').attr('disabled', true);
			return(false);
		}
		/*
		 * Очищаем второй селект с городами
		 * и блокируем его через атрибут disabled
		 * туда мы будем класть результат запроса
		 */
		$('#region_id').attr('disabled', true);
		$('#region_id').html('<option>загрузка...</option>');
		/*
		 * url запроса городов
		 */		
		var url = '/assets/components/my_php_scripts/connectors.php'; // get_regions.php

		/*
		 * GET'овый AJAX запрос
		 * подробнее о синтаксисе читайте
		 * на сайте http://docs.jquery.com/Ajax/jQuery.get
		 * Данные будем кодировать с помощью JSON
		 */
		$.post(
			url,
			{cur_tv_name: 'auto.mark'
			,cur_tv_id: '11'
			,cur_tv_properties: 'a:1:{s:12:&quot;target_tv_id&quot;;a:7:{s:4:&quot;name&quot;;s:12:&quot;target_tv_id&quot;;s:4:&quot;desc&quot;;s:89:&quot;id TV параметра, который будет динамически изменен&quot;;s:4:&quot;type&quot;;s:11:&quot;numberfield&quot;;s:7:&quot;options&quot;;a:0:{}s:5:&quot;value&quot;;s:2:&quot;12&quot;;s:7:&quot;lexicon&quot;;N;s:4:&quot;area&quot;;s:0:&quot;&quot;;}}'
			,cur_value: '120'
			,cur_resources: '3365'
			,action: 'listbox-dynamic-return-query'},			
			
			function (result) {
			

				/*
				 * В случае неудачи мы получим результат с type равным error.
				 * Если все прошло успешно, то в type будет success,
				 * а также массив regions, содержащий данные по городам
				 * в формате 'id'=>'1', 'title'=>'название города'.
				 */
				if (result.type == 'error') {
					/*
					 * ошибка в запросе
					 */
					alert('error');
					return(false);
				}
				else {
					/*
					 * проходимся по пришедшему от бэк-энда массиву циклом
					 */
					var options = '';
					$(result['rows']).each(function() {
						/*
						 * и добавляем в селект по городу
						 */
						options += '<option value="' + $(this).attr('value') + '">' + $(this).attr('text') + '</option>';
					});
					$('#region_id').html(options);
					$('#region_id').attr('disabled', false);
				}
			},
			"json"
		);
	});
});