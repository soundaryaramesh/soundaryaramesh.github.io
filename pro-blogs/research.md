---
layout: post
comments: true
title: SoundUAV - Delivery Drone Authentication via Acoustic Noise Fingerprinting
---
We all, at some point of time have experienced the annoyance of drones in parks, during live shows or at tourist locations. This project started out of curiosity to see if this annoying sound of drones possesses any useful information. Specifically, we wanted to see if the sound produced by different drones are distinct enough to uniquely identify each of them through their sound. (Think of it as equivalent to identifying humans with their voice).
Intuition dictates that drones of different models and sizes will sound different. However, we were piqued to find out if two drones of identical make and model produce distinguishable sounds. Although this seems unrealistic, our preliminary investigation with three same model drones proved otherwise. This intriguing initial observation led us to further exploration, which eventually resulted in this research work on acoustic fingerprinting of drones.


## Why does this work?
To understand why the three drones produced distinguishable sounds, we first identify the main causes of sound in drones, which are -- brushless motors, propellers and the drone frame.
On studying brushless motors further, we learned that, defects due to manufacturing of motors, make each of them unique in their intricate physical structure; and as the motors have an effect on the sound of drones, even identical make and model drones produce disparate sounds.
Although the structural differences in the motors maybe visually unnoticeable, the variations in their sounds can be captured even with a cheap microphones. 

## How about for more than three drones?
We were able to distinguish eleven quadcopter drones with an identification accuracy over 99%. As we performed analysis on motors in this work, the experiments were performed on drones without propellers, i.e., we consider drones as an assembly of four motors as shown below. We have elaborated this point in the discussion section of the paper.
<center>
<img src="{{ site.url }}/images/four-motors.jpg" width="350"/>
<i>  Quadcopter with four motors as used in our experiments. </i> 
 </center>
<br />

## What technique do we use?
For the technique used to distinguish drones, we perform cepstral analysis, as it is also applied for the task on human speaker recognition. 
This is because, the problem of speaker recognition is analogous to that of drone identification, as in both scenarios we are trying to model a physical structure -- vocal tract in the former, and intricacies in motor structure in the latter, as shown below. 

<center>
<img src="{{ site.url }}/images/vocal-tract.png" style="float: left; width: 35%; margin-right: 5%; margin-bottom: 0.5em; margin-left: 3em"/>
<img src="{{ site.url }}/images/motor-structure.png" style="float: left; width: 40%; margin-right: 1%; margin-bottom: 0.5em;"/>
<p style="clear: both;"/>
<i> Figures depicting the human vocal tract and the <br />structure of brushless motors in drones. </i> 
 </center>
On obtaining relevant audio features through cepstral analysis, we input them into Support Vector Machines to uniquely identify (i.e., fingerprint) the different drones.

## Where can such an acoustic-based drone identification technique be useful?
One potential application of drone identification systems can be for authentication of drones, where we verify the identity of drones for access control, such as restricting entry to certain drones into protected areas, and to hand over packages only to legitimate delivery drones during drone-based delivery to prevent theft of goods.

## Transitioning from Identification to Authentication in Drone Delivery
While it is necessary to have a good identification system in order to have a good authentication system, it is not close to sufficient. 
In addition to identification, it should be hard for a malicious drone (i.e., drone owned by malicious entity) to evade the authentication system in order to steal packages in drone delivery. 
Specifically, we try to answer the following questions in the presence of malicious drones --
* What happens when a malicious drone impersonates a legitimate delivery drone in order to steal packages?

To identify a malicious drone using a classifier that is trained only on legitimate drones is a challenge.
SVM associates unbounded regions with each legitimate drone, and hence it is quite likely that a malicious drone will be predicted as one of the legitimate drones with high confidence, as shown in the figures below. We overcome this issue by training two separate SVM models for two different rotation speeds. Although the malicious drone is predicted to be a legitimate drone in each case, we notice that the predicted labels are different in the two cases when the speeds are far apart. In the illustrative example shown below, the malicious drone samples are predicted as label Y by the low-speed model and label Z by the high-speed model.
We leverage upon this difference in predicted labels that occurs with a high probability in the presence malicious drones, in order to identify them.

<center>
<img src="{{ site.url }}/images/low-speed-model.png" style="float: left; width: 35%; margin-right: 5%; margin-bottom: 0.5em; margin-left: 4em"/>
<img src="{{ site.url }}/images/high-speed-model.png" style="float: left; width: 35%; margin-right: 1%; margin-bottom: 0.5em;"/>
<p style="clear: both;"/>
<i> SVM models trained on legitimate drones for <br />two different speeds (low and high resp.) of rotation.</i> 
 </center>

* What happens if the malicious drone is equipped with a speaker that can play a recording of a legitimate drone in order to fool the authentication system?

In order to prevent such an attack, the user can choose two rotation speeds at random, and record the drone's sound for random time intervals. This will defeat the attacker's trick if the speaker recording is static. Also, as the drone's motors will not rotate during the attack, and the sound originates from the speakers, the attack becomes noticeable to the user.

* What if the malicious entity modifies the structure of her drone's motors in order to produce the same sound as one of the legitimate drones?

If the attacker modifies the structure to match a legitimate drone, then the attack will surely succeed.
However, we assume that the attacker has no physical access to any of the legitimate drones. Hence, in order to modify the drone's structure, she will have to reverse engineer the structure of the motors in the legitimate drone, with its audio recordings alone. We believe that this is quite challenging, especially because four motors are operating at once and hence it would be hard to tell which sound corresponds to which motor. 

That's the end of my first research project blog! If you want to know more details, have a look at the paper here. 


