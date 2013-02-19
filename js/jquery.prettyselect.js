(function($) {

    $.fn.prettySelect = function(opts) {

        var options = $.extend({
            xOffset: 0
        }, opts);

        return this.each(function() {

            var $select = $(this).hide(),
                showing = false;

            var $fakeSelect = $('<div/>', {
                css: {
                    position: 'relative'
                },
                'class': 'select',
                click: toggleSelect
            }).insertAfter($select);

            var $selectedOption = $('<div/>', {
                'class': 'selected'
            }).appendTo($fakeSelect);

            var $dropdownArrow = $('<div/>', {
                'class': 'arrow-down'
            }).appendTo($fakeSelect);

            var $options =  $('<ul/>', {
                'class': 'options',
                'style': 'list-style: none;' +
                    'position: absolute;' +
                    'top: ' + ($fakeSelect.outerHeight()+options.xOffset) + 'px;' +
                    'left: -1px;'
            }).appendTo($fakeSelect).hide();

            $select.find('option').each(function() {
                $('<a/>', {
                    'text': $(this).text(),
                    click: selectOption
                }).appendTo($('<li/>').appendTo($options));
            });

            selectOption.call($('li:first a', $options));

            function selectOption(e) {
                var $this = $(this);
                $('li a', $options).removeClass('active');
                $this.addClass('active');
                $selectedOption.text($this.text());
                $select.find('option').removeAttr('selected').each(function() {
                    if($this.text() == $(this).text()) {
                        $(this).attr('selected', 'selected');
                    }
                });
                if (e) {
                    toggleSelect();
                    e.stopPropagation();
                }
            }

            function toggleSelect(e) {
                showing = !showing;
                $fakeSelect.toggleClass('active');
                $options.slideToggle();
                e && e.stopPropagation();
            }

            $('body').on('click', function() {
                showing && toggleSelect();
            });

        });
    };
})(window.jQuery);
