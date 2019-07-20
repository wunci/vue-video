var Toast = {};
Toast.install = function(Vue, options) {
  Vue.prototype.$toast = options => {
    let icon = options.icon == 'success' ? 'icon-chenggong' : 'icon-shibai';

    if (document.getElementsByClassName('dialog').length) return;

    let toastCpl = Vue.extend({
      template: `<section class="dialog">
                    <div class="dialog_wrap aniDialog">
                        <i class="iconfont ${icon}"></i>
                        <p>${options.message}</p>
                    </div>
                </section>`,
    });
    let tpl = new toastCpl().$mount().$el;
    document.body.appendChild(tpl);
    setTimeout(function() {
      document.body.removeChild(tpl);
      options.success && options.success();
    }, 1500);
  };
};
module.exports = Toast;
