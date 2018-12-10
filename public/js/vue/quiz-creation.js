var QuestionCount = Vue.extend({
    template: '<h3 id="q-count">Total questions: {{ qcount }}</h3>',
    props: ['qcount']
});

Vue.component('question-count', QuestionCount);

new Vue({
    data: {
        question_count: 0,
        quiz_title: '',
        quiz_description: '',
        questions: [],
        answers: []
    },
    mounted: function ()  {
        var qCount = document.getElementById('q-count');
        qCount.setAttribute('qcount', this.$data.question_count);
    },
    el: '#application'
});
