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

		// init item from hidden field
		initItems(select, select_hidden.val(), item,function () {
			deleteItems(select, select.find('.delete_item'));
			editItems(select, select.find('.edit_value'));
		});

		// new item list
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
				editItems(select, select.find('.edit_value'));
				changeInputHidden(select_hidden, select.find('.select-item_list'));
			}
		});

		// accordion
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

		$('#cancelValue').on( "click", function() {
			closeModal();
		});

		$('.modalDialog').on( "click", function() {
			closeModal();
		});
		$('.modal_edit_value').on( "click", function(e) {
			e.stopPropagation();
		})
	});
};

// add new items
var newItemList = function (value, item) {
	item.append(
		"<li class='select-item_list' data-value='" + value + "'>" +
		"<span class='select-item_list--edit edit_value'></span>" +
		"<span class='select-item_list--title'>" + value + "</span>" +
		"<button type='button' class='select_btn delete_item'>-</button>" +
		"</li>"
	);
};


// delete point items
var deleteItems = function (select, elem) {
	select.find('.select-item_list--stop').remove();
	elem.each(function( index ) {
		$( this ).on( "click", function() {
			if(select.find('.select-item_list').length > 1) {
				$( this ).parents('.select-item_list').remove();
				changeInputHidden(
					select.find('.select_hidden'),
					select.find('.select-item_list')
				);
			} else {
				if(!select.find('.select-item_list--stop').length) {
					select.find('.select-item_list')
						.append(
							'<div class="select-item_list--stop">' +
							'По умолчанию должен остаться один параметр' +
							'</div>'
						)
				}
			}
		})
	});
};

// edit items
var editItems = function (select, elem) {
	elem.each(function( index ) {
		$( this ).on( "click", function() {
			var _this = $( this );
			var value = _this.parent().attr('data-value');
			_this.parent().addClass('active-form');
			modalDialog(value, function () {
				changeInputHidden(
					select.find('.select_hidden'),
					select.find('.select-item_list')
				)
			})
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

// change Input Hidden point select
var changeInputHidden = function (input, list) {
	var stringItems = '';
	list.each(function( index ) {
		stringItems += '@@' +$( this ).attr('data-value');
	});
	input.val(stringItems)
};

// open modal & edit field
var modalDialog = function (value, callback) {
	var modalDialog = $('.modalDialog');
	modalDialog.removeClass( 'modalDialog_close' );
	var edit_value_input = $('#edit_value--input');
	edit_value_input.val(value);
	$('.select-item_list--stop').remove();
	$('#changeValue').on( "click", function() {
		var active = $('.active-form');
		active.find('.select-item_list--title').text(edit_value_input.val());
		active.attr('data-value', edit_value_input.val());
		callback();
		edit_value_input.val('');
		active.removeClass( 'active-form' );
		modalDialog.addClass( 'modalDialog_close' );
	});
};

// close modal
var closeModal = function () {
	var modalDialog = $('.modalDialog');
	modalDialog.addClass( 'modalDialog_close' );
	$('#edit_value--input').val('');
	$('.select-item_list').removeClass( 'active-form' );
};