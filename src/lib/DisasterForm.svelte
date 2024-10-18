<script>

</script>

<section>
<h2>Report a Disaster</h2>
<form>

    <label for="location">Location:</label>
        <input type="text" id="location" name="location" required><br><br>

        <label for="handler">Who is handling the situation:</label>
        <select id="handler" name="handler" required>
            <option value="" disabled selected>Select an option</option>
            <option value="CDNZ">Civil Defence</option>
            <option value="NZPF">NZ Police Force</option>
            <option value="FENZ">FENZ</option>
        </select>
        <label for="timeStarted">Time it started:</label>
        <input type="time" id="timeStarted" name="timeStarted" required>
        <fieldset>
            <legend>Priority Level:</legend>
            <input type="radio" id="red" name="priority" value="red" required>
            <label for="red">Red</label><br>
            <input type="radio" id="orange" name="priority" value="orange">
            <label for="orange">Orange</label><br>
            <input type="radio" id="green" name="priority" value="green">
            <label for="green">Green</label><br>
        </fieldset><br>

        <!-- Submit Button -->
        <input type="submit" value="Submit">
 
</form>

</section>

<style>

</style>