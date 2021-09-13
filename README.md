<div align="center">
    <h1>RAID5 Simulator</h1>
    <p>web application made with nodejs, express and pug</p>
</div>

## Description
<div>
    <p>Given a number of disks and a number of blocks in each disk, the application build a table showing disk blocks and which one is for parity.</p>
    <p> 
        The application was deployed on heroku : https://raid5-simulator.herokuapp.com/?col=5&row=10 <br>
        <strong>col</strong> => represents the number of disks. <br>
        <strong>row</strong> => represents the number of blocks in each disk.<br>
        Set these parameters to get a different table.
    </p>
</div>

## Install
    $ git clone https://github.com/izemaghilas/raid5-simulator.git
    $ cd raid5-simulator
    $ npm install

## Running the project
    $ npm run dev or npm start
