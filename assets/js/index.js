jQuery( document ).ready(function($) {

	selectInit($('.select'));

});

// create items
var selectInit = function (elem) {
	elem.each(function( index ) {
		var select = $( this );

		var item = select.find('.select-item');
		var select_title = select.find('.select_title');

		var select_hidden = select.find('.select_hidden');

		var addOption = select.find('.select_group .select_btn');
		var textOption = select.find('.select_group .select_input');

		initItems(select, select_hidden.val(), item,function () {
			deleteItems(select, select.find('.delete_item'));
		});


		addOption.on( "click", function() {
			if(textOption.val() === "" || textOption.val().length < 1) {
				textOption.addClass('danger_input');
			} else {
				if(textOption.hasClass('danger_input')) {
					textOption.removeClass('danger_input');
				}
				newItemList(textOption.val(), item);
				textOption.val('');

				deleteItems(select, select.find('.delete_item'));
				changeInputHidden(select_hidden, select.find('.select-item_list'));
			}
		});

		select_title.on( "click", function() {
			var _this = $(this);

			_this.parent().toggleClass( "show" );

			_this.find('.select_arrow')
				.toggleClass( 'arrow_close' )
				.toggleClass( 'arrow_open' );

			if(_this.find('.select_arrow').hasClass('arrow_open')) {
				_this.siblings('.select_content')
					.slideDown();
			} else {
				_this.siblings('.select_content')
					.slideUp();
			}

		});
	});
};

// add new items
var newItemList = function (value, item) {
	item.append(
		"<li class='select-item_list' data-value='" + value + "'>" +
		"<span class='select-item_list--title'>" + value + "</span>" +
		"<button type='button' class='select_btn delete_item'>-</button>" +
		"</li>"
	);
};

// delete point items
var deleteItems = function (select, elem) {
	elem.each(function( index ) {
		$( this ).on( "click", function() {
			if(select.find('.select-item_list').length > 1) {
				$( this ).parents('.select-item_list').remove();
				changeInputHidden(
					select.find('.select_hidden'),
					select.find('.select-item_list')
				);
			} else {
				alert('По умолчанию должен остаться один параметр');
			}
		})
	});
};

// init items
var initItems = function (select, input, item, calback) {
	var newValue = input.replace(/(@@)/g, ',').split(',');
	var value = newValue.filter(function (el) {
		return el !== '';
	});
	var i = 0;
	var cdn = value.length;
	if(cdn) {
		for ( ;cdn > i; i++ ) {
			newItemList(value[i], item);
		}

		calback()
	}

};

var changeInputHidden = function (input, list) {
	var stringItems = '';
	list.each(function( index ) {
		stringItems += '@@' +$( this ).attr('data-value');
	});
	input.val(stringItems)
};