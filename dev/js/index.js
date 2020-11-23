$(document).ready(function () {
    var nav = $('.g-nav');

    /**
     * Responsive Navigation
     */
    $('#menu-toggle').on('click', function (e) {
        var duration = 200;
        nav.slideToggle(duration);
        $(document).on('click', function () {
            nav.slideUp(duration);
        });
        e.stopPropagation();
    });

    nav.on('click', function (e) {
        e.stopPropagation();
    });

    /*
     *  Header Bar
     */
    if ($(window).width() > 695) {
        var header = $('.g-header');
        var headerHeight = header.outerHeight();
        var logo = $('.g-logo');
        var navText = nav.find('a');
        var themeStyle = $('.g-banner').attr('data-theme');
        var scFlag = $(document).scrollTop();
        var baseUrl = $('#base_url').val();

        $(document).scroll(function () {
            var scrollTop = $(this).scrollTop();
            var navClassName = 'nav-' + themeStyle;

            if (scrollTop > headerHeight) {
                if (scrollTop > 3 * headerHeight) {
                    header.addClass('headerUp');
                }
                header.css({
                    'background-color': 'rgba(255, 255, 255, .98)',
                    'box-shadow': '0 1px 12px rgba(0, 0, 0, .08)'
                });
                logo.css({
                    'background': 'url(' + baseUrl + '/assets/icons/logo_' + themeStyle + '.svg) no-repeat center',
                    'background-size': '100% 100%'
                });
                navText.css('color', '#666');
                nav.addClass(navClassName);
            } else {
                header.removeClass('headerUp');
                header.css({
                    'background-color': 'transparent',
                    'box-shadow': 'none'
                });
                logo.css({
                    'background': 'url(' + baseUrl + 'assets/icons/logo.svg) no-repeat center',
                    'background-size': '100% 100%'
                });
                navText.css('color', '#fff');
                nav.removeClass(navClassName);
            }

            // scroll action
            if (scFlag > scrollTop) {
                header.addClass('headerDown');
            } else {
                header.removeClass('headerDown');
            }
            scFlag = scrollTop;
        });
    }

    /*
     * Post Cover Resize
     */
    function postCover(img, container) {
        var imgWidth = img.width();
        var containerWidth = container.width();
        var imgHeight = img.height();
        var containerHeight = container.height();

        if (imgHeight < containerHeight) {
            img.css({
                'width': 'auto',
                'height': '100%'
            });
            imgWidth = img.width(),
                containerWidth = container.width();
            var marginLeft = (imgWidth - containerWidth) / 2;
            img.css('margin-left', '-' + marginLeft + 'px');
        } else {
            var marginTop = (containerHeight - imgHeight) / 2;
            img.css('margin-top', marginTop + 'px');
        }

        img.fadeIn();
    }

    /**
     * The Post Navigator
     */
    $('.read-next-item section').each(function () {
        var n = $(this).height();
        var rn = $('.read-next-item').height();
        $(this).css('margin-top', (rn - n) / 2 + 'px');
        $(this).fadeIn();
    });

    $('.read-next-item img').each(function () {
        postCover($(this), $('.read-next-item'));
    });

    /**
     * Pagination
     */
    function pagination() {
        var total = parseInt($('#total_pages').val());
        var current = parseInt($('#current_pages').val());
        var baseUrl = $('#base_url').val();
        var limit = 3;

        var link_html = '';

        for (var i = current - limit; i < current; i++) {
            if (i > 0 && i !== 1) {
                link_html += '<a href="' + baseUrl + 'page' + i + '" class="page-link page-num">' + i + '</a>';
            } else if (i === 1) {
                link_html += '<a href="' + baseUrl + '" class="page-link page-num">' + i + '</a>';
            }
        }

        link_html += '<span class="page-link page-num active">' + current + '</span>';

        for (var j = current + 1; j <= current + limit; j++) {
            if (j <= total) {
                link_html += '<a href="' + baseUrl + 'page' + j + '" class="page-link page-num">' + j + '</a>';
            }
        }

        $('#page-link-container').html(link_html);
    }
    pagination();

    /**
     * Search
     */
    function Search() {
        var self = this;
        var input = $('#search_input');
        var result = $('.search_result');

        input.focus(function () {
            $('.icon-search').css('color', '#3199DB');
            result.show();
        });

        input.keyup(debounce(this.autoComplete));

        $(document).click(function (e) {
            if (e.target.id === 'search_input' || e.target.className === 'search_result' || e.target.className === 'search_item') {
                return;
            }
            $('.icon-search').css('color', '#CAD3DC');
            result.hide();
        });
    }

    Search.prototype.autoComplete = function () {
        var keywords = this.value.toLowerCase();

        if (keywords.length) {
            $('.icon-search').css('color', '#3199DB');
        } else {
            $('.icon-search').css('color', '#CAD3DC');
        }

        $.getJSON('../../search.json').done(function (data) {
            var html = '';
            for (var i in data) {
                var item = data[i];
                var title = item.title;
                var tags = item.tags;
                var url = item.url;

                var k = title + tags;
                if (keywords !== '' && k.toLowerCase().indexOf(keywords) >= 0) {
                    html += '<a class="search_item" href="' + item.url + '">' + item.title + '</a>';
                }
            }
            $('.search_result').html(html);
        });
    };

    function debounce(fn, delay) {
        var timer;
        delay = delay || 120;

        return function () {
            var ctx = this;
            var args = arguments;
            var later = function () {
                fn.apply(ctx, args);
            };
            clearTimeout(timer);
            timer = setTimeout(later, delay);
        };
    }

    new Search();

    /**
     * Night mode
     */
    function nightMode() {
        var el = $('body');
        var className = 'night-mode';
        var date = new Date();
        var hour = date.getHours();
        var baseUrl = $('#base_url').val();
        if (localStorage.getItem('sw-theme') === 'dark') {
            el.addClass(className);
            $('.theme-switch>i').css({
                'background': 'url(' + baseUrl + 'assets/icons/contrast-light.svg) no-repeat center',
                'background-size': '100% 100%'
            });
            return;
        }
        if (localStorage.getItem('sw-theme') === 'light') {
            $('.theme-switch>i').css({
                'background': 'url(' + baseUrl + 'assets/icons/contrast-dark.svg) no-repeat center',
                'background-size': '100% 100%'
            });
            return;
        }
        if (hour <= 6 || hour >= 18) {
            el.addClass(className);
        }
    }

    if ($('#nm-switch').val() === 'true') {
        window.localStorage && localStorage.setItem('theme', 'dark');
        nightMode();
    }

    /**
     * Copy and copyright
     */
    function setClipboardData(str) {
        str += '\n\n著作权归作者所有。\n商业转载请联系作者获得授权,非商业转载请注明出处。\n原文: ' + location.href;
        $('.post-content').on('copy', function (e) {
            var data = window.clipboardData || e.originalEvent.clipboardData;
            data.setData('text/plain', str);
            e.preventDefault();
        });
    }
    $('.post-content').on('mouseup', function (e) {
        var txt = window.getSelection();
        if (txt.toString().length >= 30) {
            setClipboardData(txt);
        }
    });

    function isMobile() {
        return window.screen.width < 767;
    }

    function theme_switch_init() {
        if (isMobile()) {
            var info = $('.theme-switch');
            var icon = $('.theme-switch>i');
            var swTheme = localStorage.getItem('sw-theme');
            if (swTheme === 'dark') {
                info.append('THEME LIGHT');
            } else if (swTheme === 'light') {
                info.append('THEME DARK');
            } else {
                info.append('THEME DARK');
            }
            info.css({
                "color": "#A5A8B0",
                "padding": "16px 0",
                "font-weight": "bold",
                "font-size": "12px"
            })
            icon.hide();
        }
    }
    theme_switch_init();

    // for theme-switch
    $('.theme-switch').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (localStorage.getItem('sw-theme') === 'dark') {
            window.localStorage && localStorage.setItem('sw-theme', 'light');
            console.log('sw-theme', 'to light');
            location.reload();
        } else if (localStorage.getItem('sw-theme') === 'light') {
            window.localStorage && localStorage.setItem('sw-theme', 'dark');
            console.log('sw-theme', 'to dark');
            location.reload();
        }
    });
});