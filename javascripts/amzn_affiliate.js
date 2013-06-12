/** Generate affiliate link for Amazon *
  * Shamelessly copied from https://github.com/gkoberger/stacksort/blob/master/js/script.js *
  */


$(function() {



    function parseArray(array) { 
        if(!array) {
            return [];
        }

        return JSON.parse(array);
    }

    if(!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g,'');
        };
    }

    /* Set up controller */
    var _ = {
        page: window.localStorage.ss_page || 1,
        item: 0,
        stop: false,
        reset: function() {
            _.item = 0;
            $('#logger').empty().append($('<div>', {class: 'oc', text: 'output console'}));
            $('#sort').attr('disabled', false).text('Sort');
            $('.done').hide();
        },
            


        generate_url: function() {
            /* Example URL: http://www.amazon.com/exec/obidos/ASIN/0307381676/hansbusblo-20 */
            var prefix_url = 'http://www.amazon.com/exec/obidos/ASIN/';
            var affiliate_url = prefix_url + $('#ASIN').val() + '/' + $('#affiliate_id').val();

            //var question_url = _.api + 'search/advanced?sort=votes&accepted=True&notice=False&tagged=javascript&title=sort&page=' + _.page + common_url;

           
            // Save the new answers
            window.localStorage.link = affiliate_url;
        },
        
        wait: function (state) {
            $('.sad-waiter').css({
                height: state ? 137 : 0
            }).find('.hour, .minute').css({
                display: state ? 'block' : 'none'
            });
            $('#stopper').toggleClass('hide', !state);
        }
    };
    
    

    _.wait(false);

    /* Dom stuff */
    $('#no').click(function() {
        $('#output').val("");
        $('#generate').attr('disabled', true).text('Generating...');
        _.stop = false;

        _.run_snippet();
        return false;
    });

    $('#generate').click(function() {
        window.alert('Yes, calling generate click() function');
        var warn = "This generates an Amazon Affiliate link. There is no verification if the ASIN (Amazon Standard Identification Number) is valid.";
        var ready = window.localStorage.ss_confirmed || confirm(warn);
        if(!ready) {
            return false;
        }
        window.localStorage.ss_confirmed = true;

        _.reset();

        $('#generate').attr('disabled', true).text('Generating...');
        _.stop = false;

        _.generate_url();
    });

    $('.desc a').click(function() {
        if($(this).data('type') === 'list') {
            $('#input').val('[8,6,7,5,3,0,9]');
        } else if($(this).data('type') === 'words') {
            $('#input').val('["World","Hello"]');
        } else if($(this).data('type') === 'text') {
            $('#input').val('"jennyigotyournumber"');
        } else {
            $('#input').val('{3:"Hello",9:"World",1:"Oh,"}');
        }
        _.stop = true;
        _.reset();

        if($(this).parent().hasClass('start-now')) {
            $('#sort').trigger('click');
        }
        return false;
    }).eq(0).trigger('click');

    $('#stop').click(function() {
        _.stop = true;
        return false;
    });
});
