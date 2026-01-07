
const previousPage = () => {
    if (document.getElementById('part1').style.display === 'none' && document.getElementById('part2').style.display === 'none' && document.getElementById('part3').style.display === '') {

        // document.getElementById('part1').style.display = 'none';
        document.getElementById('part2').style.display = ''
        document.getElementById('part3').style.display = 'none';

    }
    else if (document.getElementById('part1').style.display === 'none' && document.getElementById('part2').style.display === '' && document.getElementById('part3').style.display === 'none') {

        document.getElementById('part1').style.display = '';
        document.getElementById('part2').style.display = 'none';
        // document.getElementById('part3').style.display = 'none';

    }
}

const nextPage = () => {

    if (document.getElementById('part1').style.display === '' && document.getElementById('part2').style.display === 'none' && document.getElementById('part3').style.display === 'none') {

        document.getElementById('part1').style.display = 'none';
        document.getElementById('part2').style.display = ''
        // document.getElementById('part3').style.display === 'none';
        
    }
    else if (document.getElementById('part1').style.display === 'none' && document.getElementById('part2').style.display === '' && document.getElementById('part3').style.display === 'none') {

        // document.getElementById('part1').style.display === 'none';
        document.getElementById('part2').style.display = 'none';
        document.getElementById('part3').style.display = '';
        
    }
}