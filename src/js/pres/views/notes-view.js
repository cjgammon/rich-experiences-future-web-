/*global define TimelineMax TweenMax $ Quad*/
define(function (require) {
	
	var Backbone = require('backbone'),
		Vars = require('pres/models/vars'),
		AppEvent = require('pres/events/app-event'),
		NotesView; 
		
	NotesView = Backbone.View.extend({
		
		initialize: function () {
            var $body = $('body');

            $body.bind('keydown', this.handle_KEYDOWN.bind(this));
            $body.bind('keyup', this.handle_KEYUP.bind(this));
			AppEvent.on('resolve', this.resolve, this);

            this.CTR = false;
            this.open = false;
        },

        resolve: function () {
            this.currentSlide = Vars.get('currentSlide');
            this.gotoSlide(this.currentSlide);
        },

        gotoSlide: function (num) {
            if (this.open) {
                this.popup.gotoSlide(num);
            }
        },

        populate: function () {
            var asides = document.getElementsByTagName('aside');
            this.popup.populateSlides(asides);
            this.resolve();
        },

        handle_KEYDOWN: function (e) {

            //CTRL + k triggers notes
            if (e.keyCode == 17) {
                this.CTR = true;
            }
            else if (e.keyCode == 75 && this.CTR === true) 
            {
                if (this.open === false) {
                    this.popup = window.open('templates/notes-template.html', 'notes', "height=400,width=500");
                    this.open = true;
                    setTimeout(this.populate.bind(this), 100);
                } else {
                    this.popup.close();
                    this.open = false;
                }
            }
        },

        handle_KEYUP: function (e) {
            if (e.keyCode == 17) {
                this.CTR = false;
            }
        }

	});
	
	return NotesView;
});
