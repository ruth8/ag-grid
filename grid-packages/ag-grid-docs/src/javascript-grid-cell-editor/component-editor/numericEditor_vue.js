import Vue from 'vue';

const KEY_BACKSPACE = 8;
const KEY_DELETE = 46;

export default Vue.extend({
    template: `<input :ref="'input'" @keydown="onKeyDown($event)" v-model="value"/>`,
    data() {
        return {
            value: '',
            cancelBeforeStart: true,
        };
    },
    methods: {
        getValue() {
            return this.value;
        },

        isCancelBeforeStart() {
            return this.cancelBeforeStart;
        },

        // will reject the number if it greater than 1,000,000
        // not very practical, but demonstrates the method.
        isCancelAfterEnd() {
            return this.value > 1000000;
        },

        onKeyDown(event) {
            if (!this.isKeyPressedNumeric(event)) {
                if (event.preventDefault) event.preventDefault();
            }
        },

        getCharCodeFromEvent(event) {
            event = event || window.event;
            return (typeof event.which === "undefined") ? event.keyCode : event.which;
        },

        isCharNumeric(charStr) {
            return /\d/.test(charStr);
        },

        getStartValue(params) {
            if (params.keyPress === KEY_BACKSPACE || params.keyPress === KEY_DELETE) {
                // if backspace or delete pressed, we clear the cell
                return '';
            } else if (params.charPress) {
                // if a letter was pressed, we start with the letter
                return params.charPress;
            } else {
                // otherwise we start with the current value
                return params.value;
            }
        },

        isKeyPressedNumeric(event) {
            const charCode = this.getCharCodeFromEvent(event);
            const charStr = String.fromCharCode(charCode);
            return this.isCharNumeric(charStr);
        },
    },

    created() {
        this.value = this.getStartValue(this.params);

        // only start edit if key pressed is a number, not a letter
        this.cancelBeforeStart =
            this.params.charPress && '1234567890'.indexOf(this.params.charPress) < 0;
    },
    mounted() {
        Vue.nextTick(() => {
            // need to check if the input reference is still valid - if the edit was cancelled before it started there
            // wont be an editor component anymore
            if (this.$refs.input) {
                this.$refs.input.focus();
            }
        });
    },
});
