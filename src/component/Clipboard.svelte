<script>
    //https://stackoverflow.com/questions/36639681/how-to-copy-text-from-a-div-to-clipboard
    export let element;
    let setback = false;

    function copyRef() {
        if (element) {
            const range = document.createRange();

            if (element.style.display === "none") {
                setback = true;
                element.style.display = "block";
            }

            range.selectNode(element);
            window.getSelection().removeAllRanges(); // clear current selection

            window.getSelection().addRange(range); // to select text

            document.execCommand("copy");
            window.getSelection().removeAllRanges(); // to deselect

            if (setback === true) {
                element.style.display = "none";
            }
        }
    }
</script>

<span title="Copy Output" class="copy" on:click={copyRef}>📋</span>



<style>
    .copy {
        position: absolute;
        right: 15px;
        bottom: 10px;
        z-index: 2;
        font-size: 2em;
    }

    .copy:hover {
        text-shadow: 2px 2px rgb(153, 153, 153);
    }
</style>